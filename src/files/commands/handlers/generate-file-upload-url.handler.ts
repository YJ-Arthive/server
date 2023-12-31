import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateFileUploadUrlCommand } from '../generate-file-upload-url.command';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GenerateFileUploadUrlResponseDto } from '../../dtos/generate-file-upload-url-response.dto';
import { ConfigService } from '@nestjs/config';

@CommandHandler(GenerateFileUploadUrlCommand)
export class GenerateFileUploadUrlHandler implements ICommandHandler<GenerateFileUploadUrlCommand> {
  constructor(private readonly configService: ConfigService) {}

  async execute(command: GenerateFileUploadUrlCommand): Promise<GenerateFileUploadUrlResponseDto> {
    const s3 = new S3Client({ region: 'ap-northeast-2' });
    const putCommand = new PutObjectCommand({ Bucket: 'arthive-main', Key: command.objectKey });
    const preSignedUrl = await getSignedUrl(s3, putCommand, { expiresIn: 3600 });
    return {
      preSignedUrl,
      cdnLink: `${this.configService.get('CDN_LINK')}/${
        command.objectKey.startsWith('/') ? command.objectKey.substring(1) : command.objectKey
      }`,
    };
  }
}
