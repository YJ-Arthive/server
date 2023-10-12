import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddNewGalleryCommand } from '../add-new-gallery.command';
import { EntityManager } from '@mikro-orm/core';
import { Transactional } from '../../../common/decorators/transactional.decorator';
import { AddNewGalleryResponseDto } from '../../dtos/add-new-gallery-response.dto';
import { GalleryEntity } from '../../entities/gallery.entity';

@CommandHandler(AddNewGalleryCommand)
export class AddNewGalleryHandler implements ICommandHandler<AddNewGalleryCommand> {
  constructor(private readonly em: EntityManager) {}

  @Transactional()
  async execute(command: AddNewGalleryCommand): Promise<AddNewGalleryResponseDto> {
    const request = command.addRequest;
    this.em.persist(
      new GalleryEntity(
        request.galleryName,
        request.address,
        request.closeDay,
        request.openTime,
        request.closeTime,
        request.posterUrl,
        request.homepageUrl,
      ),
    );

    return { ack: true };
  }
}
