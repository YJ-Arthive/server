import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPaginatedGalleriesQuery } from '../../queries/get-paginated-galleries.query';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../common/dtos/paginated-response.dto';
import { GalleryListResponseDto } from '../../dtos/gallery-list-response.dto';
import { ApiPaginatedResponse } from '../../../common/decorators/api-paginated-response.decorator';
import { GetGalleryDetailMetaQuery } from '../../queries/get-gallery-detail-meta.query';
import { GalleryDetailMetaResponseDto } from '../../dtos/gallery-detail-meta-response.dto';
import { AddNewGalleryRequestDto } from '../../dtos/add-new-gallery-request.dto';
import { AddNewGalleryCommand } from '../../commands/add-new-gallery.command';
import { AddNewGalleryResponseDto } from '../../dtos/add-new-gallery-response.dto';

@Controller('/api/v1/galleries')
export class GalleriesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

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

  @ApiParam({ description: '조회하려는 갤러리의 id', example: 1, name: 'id' })
  @ApiOperation({
    tags: ['gallery'],
    summary: '갤러리 상세 정보 조회',
    description: '갤러리의 id로 상세정보를 조회합니다.',
  })
  @ApiOkResponse({ description: '상세정보 조회 성공', type: GalleryDetailMetaResponseDto })
  @ApiNotFoundResponse({ description: '해당 ID를 가진 갤러리가 존재하지 않음' })
  @Get('/:id')
  async getGalleryDetails(@Param('id') id: bigint): Promise<GalleryDetailMetaResponseDto> {
    return this.queryBus.execute(new GetGalleryDetailMetaQuery(id));
  }

  @ApiBody({ description: '등록할 갤러리 정보', type: AddNewGalleryRequestDto })
  @ApiOperation({ tags: ['gallery'], summary: '갤러리 등록', description: '갤러리 정보를 등록합니다.' })
  @ApiCreatedResponse({ description: '갤러리 등록 성공', type: AddNewGalleryResponseDto })
  @Post()
  async addNewGallery(@Body() addRequest: AddNewGalleryRequestDto): Promise<AddNewGalleryResponseDto> {
    return await this.commandBus.execute(new AddNewGalleryCommand(addRequest));
  }
}
