import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GenerateFileUploadUrlRequestDto {
  @ApiProperty({
    description: 'S3 버킷에 저장될 파일의 Key(파일 명). Unique한 값이 필요함.',
    example: 'gallery/image/2023/01/01/some-gallery-poster.jpg',
    required: true,
  })
  @IsNotEmpty()
  readonly objectKey: string;
}
