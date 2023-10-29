import { IsEmail, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequestDto {
  @IsEmail()
  @ApiProperty({ description: '로그인 시 사용할 이메일 주소', example: 'email@email.com' })
  readonly emailAddress: string;
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?!.*\s).{8,}$/)
  @ApiProperty({
    description: '로그인 시 사용할 비밀번호. 영문 대소문자, 숫자, 특수문자(!@#$%^&*())를 모두 포함하는 8자리 이상',
    example: 'Password123!',
  })
  readonly password: string;
  @Length(2, 30)
  @ApiProperty({ description: '사용자의 이름', example: '한유진' })
  readonly name: string;
  @Matches(/^010-\d{4}-\d{4}$/)
  @ApiProperty({ description: '사용자의 전화번호', example: '010-1234-5678', format: '010-####-####' })
  readonly phoneNumber: string;
}
