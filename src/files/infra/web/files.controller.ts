import { Body, Controller, Post } from '@nestjs/common';
import { GenerateFileUploadUrlRequestDto } from '../../dtos/generate-file-upload-url-request.dto';
import { CommandBus } from '@nestjs/cqrs';
import { GenerateFileUploadUrlCommand } from '../../commands/generate-file-upload-url.command';
import { GenerateFileUploadUrlResponseDto } from '../../dtos/generate-file-upload-url-response.dto';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('/api/v1/files')
export class FilesController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiBody({ description: 'pre-signed-url을 생성하기 위한 정보', type: GenerateFileUploadUrlRequestDto })
  @ApiOperation({
    tags: ['files'],
    summary: '파일 업로드용 Url 생성',
    description: '파일을 S3 버킷에 업로드하기 위한 pre-signed-url을 생성합니다.',
  })
  @ApiCreatedResponse({ description: '생성 성공', type: GenerateFileUploadUrlResponseDto })
  @Post('/pre-signed-url')
  async generateNewPreSignedUrl(
    @Body() request: GenerateFileUploadUrlRequestDto,
  ): Promise<GenerateFileUploadUrlResponseDto> {
    return await this.commandBus.execute(new GenerateFileUploadUrlCommand(request.objectKey));
  }
}
