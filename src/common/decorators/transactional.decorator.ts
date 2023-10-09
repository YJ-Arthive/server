import { EntityManager } from '@mikro-orm/core';

/**
 * Mikro-ORM을 사용하는 코드에서 Transaction을 처리하기 위한 데코레이터입니다.
 *
 * 이 데코레이터를 사용하는 메서드가 속한 클래스는 'em'이라는 식별자를 가진 EntityManager 타입 인스턴스를 속성으로 가져야합니다.
 *
 * 아래는 NestJS에서의 사용 예 입니다.
 *
 * @Injectable()
 * export class SomeService {
 *   constructor(private readonly em: EntityManager) {}
 *
 *   @Transactional()
 *   async someMethod() {
 *     // 내부 로직...
 *   }
 * }
 *
 * @author: 김홍대(mongmeo-dev)
 * @since: 2023-09-19 09:30:00+09:00
 */
export function Transactional() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const targetMethod: (...args: any[]) => any = descriptor.value;

    descriptor.value = async function (this: any, ...args: any[]) {
      const em: EntityManager = this['em'];
      if (!em) {
        throw new Error('Entity manager not found in args');
      }

      return await em.transactional(async (em) => {
        try {
          this['em'] = em;
          const result = await targetMethod.apply(this, args);
          await em.flush();
          return result;
        } catch (e) {
          await em.rollback();
          throw e;
        }
      });
    };
  };
}
