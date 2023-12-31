import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { GalleriesModule } from './galleries/galleries.module';
import { MySqlDriver } from '@mikro-orm/mysql';
import { ArtistsModule } from './artists/artists.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';

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
        driver: MySqlDriver,
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        dbName: configService.get('DB_DATABASE'),
        user: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        autoLoadEntities: true,
      }),
    }),
    GalleriesModule,
    ArtistsModule,
    FilesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
