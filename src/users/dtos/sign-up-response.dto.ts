import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty({ description: '회원가입 성공 여부', example: true })
  readonly success: boolean;
}
