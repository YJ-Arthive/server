import { ApiProperty } from '@nestjs/swagger';

export class GenerateFileUploadUrlResponseDto {
  @ApiProperty({
    description: '파일을 S3 버킷에 업로드 할 수 있는 pre-signed-url',
    example: 'https://pre-signed-url.com',
  })
  readonly preSignedUrl: string;
  @ApiProperty({
    description: '파일 업로드 후 파일에 접근할 수 있는 CDN url',
    example: 'https://cdn-link.com/cdn.jps',
  })
  readonly cdnLink: string;
}
