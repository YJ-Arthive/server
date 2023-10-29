import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserEntity } from '../../entities/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { CheckDuplicationResponseDto } from '../../dtos/check-duplication-response.dto';
import { CheckPhoneIsDuplicatedQuery } from '../check-phone-is-duplicated.query';

@QueryHandler(CheckPhoneIsDuplicatedQuery)
export class CheckPhoneIsDuplicatedHandler implements IQueryHandler<CheckPhoneIsDuplicatedQuery> {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: EntityRepository<UserEntity>) {}

  async execute(query: CheckPhoneIsDuplicatedQuery): Promise<CheckDuplicationResponseDto> {
    return {
      field: 'PHONE',
      value: query.phoneNumber,
      isDuplicated: (await this.userRepository.count({ phoneNumber: query.phoneNumber.replace('-', '').trim() })) > 0,
    };
  }
}
