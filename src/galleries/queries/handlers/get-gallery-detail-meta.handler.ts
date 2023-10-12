import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetGalleryDetailMetaQuery } from '../get-gallery-detail-meta.query';
import { InjectRepository } from '@mikro-orm/nestjs';
import { GalleryEntity } from '../../entities/gallery.entity';
import { EntityRepository } from '@mikro-orm/core';
import { ClientException } from '../../../common/exceptions/client.exception';
import { HttpStatus } from '@nestjs/common';
import { GalleryDetailMetaResponseDto } from '../../dtos/gallery-detail-meta-response.dto';

@QueryHandler(GetGalleryDetailMetaQuery)
export class GetGalleryDetailMetaHandler implements IQueryHandler<GetGalleryDetailMetaQuery> {
  constructor(@InjectRepository(GalleryEntity) private readonly galleryRepository: EntityRepository<GalleryEntity>) {}

  async execute(query: GetGalleryDetailMetaQuery): Promise<GalleryDetailMetaResponseDto> {
    const gallery = await this.galleryRepository.findOne({ id: query.id });
    if (!gallery) {
      throw new ClientException(
        `Gallery with id ${query.id} not exists.`,
        '갤러리 정보를 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );
    }

    console.log(typeof gallery.openTime);
    return {
      id: gallery.id!,
      galleryName: gallery.name,
      address: gallery.address,
      like: false,
      closed: gallery.closeDay,
      hours:
        gallery.openTime && gallery.closeTime
          ? `${gallery.openTime.split(':')[0]}:${gallery.openTime.split(':')[1]} ~ ${gallery.closeTime.split(':')[0]}:${
              gallery.closeTime.split(':')[1]
            }`
          : undefined,
      posterUrl: gallery.posterUrl,
      homePage: gallery.homepageUrl,
    };
  }
}
