import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CheckEmailIsDuplicatedQuery } from '../../queries/check-email-is-duplicated.query';
import { CheckDuplicationResponseDto } from '../../dtos/check-duplication-response.dto';
import { CheckPhoneIsDuplicatedQuery } from '../../queries/check-phone-is-duplicated.query';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SignUpRequestDto } from '../../dtos/sign-up-request.dto';
import { SignUpResponseDto } from '../../dtos/sign-up-response.dto';
import { SignUpCommand } from '../../commands/sign-up.command';

@Controller('/api/v1/users')
export class UsersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @ApiQuery({
    name: 'email',
    description: '중복 체크할 이메일 주소(phone과 동시에 입력 시 email만 중복체크)',
    required: false,
  })
  @ApiQuery({
    name: 'phone',
    description: '중복 체크할 휴대폰 번호(email과 동시에 입력 시 email만 중복체크)',
    required: false,
  })
  @ApiOperation({
    tags: ['users'],
    summary: '휴대전화/이메일 중복체크',
    description: '입력 받은 휴대전화/이메일로 이미 가입된 계정이 있는지 조회합니다.',
  })
  @ApiOkResponse({ description: '조회 성공', type: CheckDuplicationResponseDto })
  @Get('/duplication')
  async checkDuplication(
    @Query('email') email?: string,
    @Query('phone') phone?: string,
  ): Promise<CheckDuplicationResponseDto> {
    if (email) {
      return await this.queryBus.execute(new CheckEmailIsDuplicatedQuery(email));
    }
    return await this.queryBus.execute(new CheckPhoneIsDuplicatedQuery(phone!));
  }

  @ApiBody({ description: '회원가입 시 필요한 정보', type: SignUpRequestDto })
  @ApiOperation({
    tags: ['users'],
    summary: '회원가입',
    description: '회원을 생성합니다.',
  })
  @ApiCreatedResponse({ description: '회원가입 성공', type: SignUpResponseDto })
  @Post()
  async signUp(@Body() request: SignUpRequestDto): Promise<SignUpResponseDto> {
    return await this.commandBus.execute(new SignUpCommand(request));
  }
}
