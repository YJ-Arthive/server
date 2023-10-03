import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MySqlDriver } from '@mikro-orm/mysql';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, ignoreEnvFile: false }),
    MikroOrmModule.forRootAsync({
      providers: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        dbName: configService.get('DB_DATABASE'),
        driver: MySqlDriver,
        user: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        pool: {
          min: 0,
          max: 2,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
