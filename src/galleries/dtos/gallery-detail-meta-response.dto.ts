import { ApiProperty } from '@nestjs/swagger';

export class GalleryDetailMetaResponseDto {
  @ApiProperty({ description: '갤러리 id', example: 1 })
  readonly id: bigint;
  @ApiProperty({ description: '갤러리의 이름', example: 'ART369(아트369)' })
  readonly galleryName: string;
  @ApiProperty({ description: '갤러리의 주소', example: '서울 용산구 용산동2가 17/201호' })
  readonly address: string;
  @ApiProperty({ description: '로그인한 사용자의 좋아요 표시 여부', example: false })
  readonly like: boolean;
  @ApiProperty({ description: '갤러리의 운영 시간', format: 'HH:mm ~ HH:mm', example: '10:00 ~ 18:00' })
  readonly hours?: string;
  @ApiProperty({ description: '갤러리의 휴관일', example: '토, 일, 공휴일' })
  readonly closed?: string;
  @ApiProperty({ description: '갤러리의 홈페이지 url', example: 'https://arthive-gallery.com' })
  readonly homePage?: string;
  @ApiProperty({
    description: '포스터 url',
    example: 'https://img.seoul.co.kr/img/upload/2021/09/17/SSI_20210917150355.jpg',
    required: false,
  })
  readonly posterUrl?: string;
}
