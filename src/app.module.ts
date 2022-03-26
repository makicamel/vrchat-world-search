import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { WorldsModule } from './worlds/worlds.module';

@Module({
  imports: [ConfigModule.forRoot(), SearchModule, WorldsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
