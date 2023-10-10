import { ApiProperty } from '@nestjs/swagger';

export class AddNewGalleryResponseDto {
  @ApiProperty({ description: '생성 성공 여부', example: true })
  readonly ack: boolean;
}
