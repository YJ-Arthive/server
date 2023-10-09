import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GalleriesModule } from './galleries/galleries.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    CqrsModule.forRoot(),
    MikroOrmModule.forRootAsync({
      providers: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        dbName: configService.get('DB_DATABASE'),
        user: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        autoLoadEntities: true,
      }),
    }),
    GalleriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
