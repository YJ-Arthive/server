import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaginatedGalleriesQuery } from '../get-paginated-galleries.query';
import { InjectRepository } from '@mikro-orm/nestjs';
import { GalleryEntity } from '../../entities/gallery.entity';
import { EntityRepository } from '@mikro-orm/core';
import { PaginatedResponseDto } from '../../../common/dtos/paginated-response.dto';
import { GalleryListResponseDto } from '../../dtos/gallery-list-response.dto';

@QueryHandler(GetPaginatedGalleriesQuery)
export class GetPaginatedGalleriesHandler implements IQueryHandler<GetPaginatedGalleriesQuery> {
  constructor(@InjectRepository(GalleryEntity) private readonly galleryRepository: EntityRepository<GalleryEntity>) {}

  async execute(query: GetPaginatedGalleriesQuery): Promise<PaginatedResponseDto<GalleryListResponseDto>> {
    const galleries = await this.galleryRepository.findAll({
      orderBy: { id: 'DESC' },
      limit: query.size,
      offset: (query.page - 1) * query.size,
    });

    const totalCount = await this.galleryRepository.count();

    return new PaginatedResponseDto<GalleryListResponseDto>(
      totalCount,
      galleries.map((entity) => GalleryListResponseDto.fromEntity(entity, false)),
    );
  }
}
