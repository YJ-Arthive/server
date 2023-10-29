import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { SignUpCommand } from '../sign-up.command';
import { EntityManager } from '@mikro-orm/core';
import { Transactional } from '../../../common/decorators/transactional.decorator';
import { CheckEmailIsDuplicatedQuery } from '../../queries/check-email-is-duplicated.query';
import { ClientException } from '../../../common/exceptions/client.exception';
import { HttpStatus } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import bcrypt from 'bcryptjs';
import { SignUpResponseDto } from '../../dtos/sign-up-response.dto';
import { CheckDuplicationResponseDto } from '../../dtos/check-duplication-response.dto';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly em: EntityManager,
  ) {}

  @Transactional()
  async execute(command: SignUpCommand): Promise<SignUpResponseDto> {
    await this.checkDuplication(command);

    this.em.create(
      UserEntity,
      new UserEntity(
        command.request.name,
        command.request.emailAddress,
        await bcrypt.hash(command.request.password, 10),
        command.request.phoneNumber,
      ),
    );

    return { success: true };
  }

  private async checkDuplication(command: SignUpCommand) {
    const isDuplicatedEmail: CheckDuplicationResponseDto = await this.queryBus.execute(
      new CheckEmailIsDuplicatedQuery(command.request.emailAddress),
    );
    if (isDuplicatedEmail.isDuplicated) {
      throw new ClientException(
        `Duplicated email address ${command.request.emailAddress}`,
        '이미 사용중인 이메일 주소입니다.',
        HttpStatus.CONFLICT,
      );
    }
    const isDuplicatedPhone: CheckDuplicationResponseDto = await this.queryBus.execute(
      new CheckEmailIsDuplicatedQuery(command.request.emailAddress),
    );
    if (isDuplicatedPhone.isDuplicated) {
      throw new ClientException(
        `Duplicated phone number ${command.request.phoneNumber}`,
        '이미 사용중인 휴대전화 번호입니다.',
        HttpStatus.CONFLICT,
      );
    }
  }
}
