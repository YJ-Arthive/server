import { Module } from '@nestjs/common';
import { ArtistsController } from './infra/web/artists.controller';

const CommandHandlers = [];
const QueryHandlers = [];

@Module({
  imports: [],
  providers: [...CommandHandlers, ...QueryHandlers],
  controllers: [ArtistsController],
  exports: [],
})
export class ArtistsModule {}
