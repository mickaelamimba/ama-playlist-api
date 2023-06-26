import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { PlayListController } from './play-list/play-list.controller';
import { PlayListService } from './play-list/play-list.service';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
      port: 5000,
    }),
  ],
  controllers: [AppController, PlayListController],
  providers: [AppService, PlayListService],
})
export class AppModule {}
