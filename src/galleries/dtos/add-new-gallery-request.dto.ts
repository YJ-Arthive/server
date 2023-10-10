import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, Matches, MaxLength, MinLength } from 'class-validator';

export class AddNewGalleryRequestDto {
  @MinLength(1)
  @MaxLength(255)
  @ApiProperty({ description: '갤러리의 이름', example: 'ART369(아트369)' })
  readonly galleryName: string;
  @MinLength(1)
  @MaxLength(400)
  @ApiProperty({ description: '갤러리의 주소', example: '서울 용산구 용산동2가 17/201호' })
  readonly address: string;
  @ApiProperty({ description: '갤러리의 휴관일', example: '토, 일, 공휴일' })
  readonly closeDay?: string;
  @Matches('^(?:[01]\\d|2[0-3]):[0-5]\\d$')
  @ApiProperty({ description: '갤러리의 오픈 시간', format: 'HH:mm', example: '10:00' })
  readonly openTime?: string;
  @Matches('^(?:[01]\\d|2[0-3]):[0-5]\\d$')
  @ApiProperty({ description: '갤러리의 폐관 시간', format: 'HH:mm', example: '23:00' })
  readonly closeTime?: string;
  @IsUrl()
  @ApiProperty({
    description: '포스터 url',
    example: 'https://img.seoul.co.kr/img/upload/2021/09/17/SSI_20210917150355.jpg',
    required: false,
  })
  readonly posterUrl?: string;
  @IsUrl()
  @ApiProperty({ description: '갤러리의 홈페이지 url', example: 'https://arthive-gallery.com' })
  readonly homepageUrl?: string;
}
