import { ApiProperty } from '@nestjs/swagger';

export class CheckDuplicationResponseDto {
  @ApiProperty({ description: '중복 체크한 필드', example: 'PHONE' })
  readonly field: 'PHONE' | 'EMAIL';
  @ApiProperty({ description: '중복 체크한 값', example: '010-1234-5678' })
  readonly value: string;
  @ApiProperty({ description: '중복 체크 결과(true == 중복)', example: true })
  readonly isDuplicated: boolean;
}
