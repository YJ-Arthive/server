import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CheckEmailIsDuplicatedQuery } from '../check-email-is-duplicated.query';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserEntity } from '../../entities/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { CheckDuplicationResponseDto } from '../../dtos/check-duplication-response.dto';

@QueryHandler(CheckEmailIsDuplicatedQuery)
export class CheckEmailIsDuplicatedHandler implements IQueryHandler<CheckEmailIsDuplicatedQuery> {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: EntityRepository<UserEntity>) {}

  async execute(query: CheckEmailIsDuplicatedQuery): Promise<CheckDuplicationResponseDto> {
    return {
      field: 'EMAIL',
      value: query.emailAddress,
      isDuplicated: (await this.userRepository.count({ emailAddress: query.emailAddress.trim() })) > 0,
    };
  }
}
