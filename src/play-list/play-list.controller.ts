import {
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Body,
} from '@nestjs/common';
import { PlayListService } from './play-list.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('play-list')
export class PlayListController {
  constructor(private playListService: PlayListService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename(_, file, cb) {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  async addCsvPlayList(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/csv' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return file.originalname;
  }
  @Get()
  async getCsvPlayLists() {
    return await this.playListService.getCsvPlayLists();
  }
  @Get(':id')
  async getCsvPlayList(@Param('id') id: string) {
    return await this.playListService.getCsvPlayList(id);
  }
  @Post('export')
  async export(@Body() data) {
    await this.playListService.export(data.playList, data.name);
    return 'sucsses export';
    console.log(data);
  }
}
