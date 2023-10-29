import { Module } from '@nestjs/common';
import { UsersController } from './infra/web/users.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserEntity } from './entities/user.entity';
import { SignUpHandler } from './commands/handlers/sign-up.handler';
import { CheckEmailIsDuplicatedHandler } from './queries/handlers/check-email-is-duplicated.handler';
import { CheckPhoneIsDuplicatedHandler } from './queries/handlers/check-phone-is-duplicated.handler';

const CommandHandlers = [SignUpHandler];
const QueryHandlers = [CheckEmailIsDuplicatedHandler, CheckPhoneIsDuplicatedHandler];

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [...CommandHandlers, ...QueryHandlers],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
