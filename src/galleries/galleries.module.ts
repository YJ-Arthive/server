import { Module } from '@nestjs/common';
import { GalleriesController } from './infra/web/galleries.controller';

const CommandHandlers = [];
const QueryHandlers = [];

@Module({
  imports: [],
  providers: [...CommandHandlers, ...QueryHandlers],
  controllers: [GalleriesController],
  exports: [],
})
export class GalleriesModule {}
