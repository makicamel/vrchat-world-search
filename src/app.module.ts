import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorldsSearchModule } from './worlds/worldsSearch.module';

@Module({
  imports: [ConfigModule.forRoot(), WorldsSearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
