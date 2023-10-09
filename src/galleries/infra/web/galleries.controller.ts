import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPaginatedGalleriesQuery } from '../../queries/get-paginated-galleries.query';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../common/dtos/paginated-response.dto';
import { GalleryListResponseDto } from '../../dtos/gallery-list-response.dto';
import { ApiPaginatedResponse } from '../../../common/decorators/api-paginated-response.decorator';

@Controller('/api/v1/galleries')
export class GalleriesController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiQuery({
    name: 'page',
    type: 'number',
    description: '페이지 번호(One base). 기본값은 1',
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: 'size',
    type: 'number',
    description: '한 페이지에 보여질 데이터 수. 기본값은 10',
    example: 10,
    required: false,
  })
  @ApiOperation({
    tags: ['gallery'],
    summary: '갤러리 목록 조회',
    description: '갤러리 목록을 페이지네이션하여 조회합니다다.',
  })
  @ApiPaginatedResponse(GalleryListResponseDto)
  @Get()
  async getGalleryList(
    @Query('page') page?: number,
    @Query('size') size?: number,
  ): Promise<PaginatedResponseDto<GalleryListResponseDto>> {
    return this.queryBus.execute(new GetPaginatedGalleriesQuery(page ?? 1, size ?? 10));
  }
}
