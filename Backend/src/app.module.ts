import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MetaModule } from './meta/meta.module';
import { Meta } from './meta/entities/meta.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'metalogin',
        entities:  [Meta],
        synchronize: true,
        autoLoadEntities: true,
        };
      },
    }),
    MetaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}