import { Module } from '@nestjs/common';
import { GalleriesController } from './infra/web/galleries.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GalleryEntity } from './entities/gallery.entity';
import { GetPaginatedGalleriesHandler } from './queries/handlers/get-paginated-galleries.handler';
import { GetGalleryDetailMetaHandler } from './queries/handlers/get-gallery-detail-meta.handler';
import { AddNewGalleryHandler } from './commands/handlers/add-new-gallery.handler';

const CommandHandlers = [AddNewGalleryHandler];
const QueryHandlers = [GetPaginatedGalleriesHandler, GetGalleryDetailMetaHandler];

@Module({
  imports: [MikroOrmModule.forFeature([GalleryEntity])],
  providers: [...CommandHandlers, ...QueryHandlers],
  controllers: [GalleriesController],
  exports: [],
})
export class GalleriesModule {}
