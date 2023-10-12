import { Module } from '@nestjs/common';
import { FilesController } from './infra/web/files.controller';
import { GenerateFileUploadUrlHandler } from './commands/handlers/generate-file-upload-url.handler';

const CommandHandlers = [GenerateFileUploadUrlHandler];
const QueryHandlers = [];

@Module({
  imports: [],
  providers: [...CommandHandlers, ...QueryHandlers],
  controllers: [FilesController],
  exports: [],
})
export class FilesModule {}
