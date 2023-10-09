import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { HttpStatus } from '@nestjs/common';

let server: Handler;

async function bootstrap(generateDocs: boolean = false): Promise<Handler> {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000', 'https://api.arthive.dev'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });
  await app.init();

  if (generateDocs) {
    const config = new DocumentBuilder()
      .setTitle('Arthive! API docs')
      .setVersion('1.0')
      .addServer('https://api.arthive.dev')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./openapi.json', document.openapi);
    return async (event: any, context: Context, callback: Callback) => {
      return {
        body: 'ok',
        statusCode: HttpStatus.OK,
      };
    };
  }

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};

export const generateApiDocs: Handler = async (event: any, context: Context, callback: Callback) => {
  return await bootstrap(true);
};
