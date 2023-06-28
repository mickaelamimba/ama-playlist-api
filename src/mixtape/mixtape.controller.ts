import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MixtapeDto } from './mixtape.dto';
import { MixtapeService } from './mixtape.service';
import { diskStorage } from 'multer';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('mixtape')
export class MixtapeController {
  constructor(private mixtapeService: MixtapeService) {}
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mixtape', maxCount: 1 },
      { name: 'djName', maxCount: 1 },
      { name: 'name', maxCount: 1 },
      { name: 'type', maxCount: 1 },
      { name: 'year', maxCount: 1 },
    ]),
  )
  @UseInterceptors(
    FileInterceptor('mixtape', {
      storage: diskStorage({
        destination: './files/music',
        filename(req, file, cb) {
          console.log('req:', req.body, file);
          const data = `${req.body.djName} - ${req.body.name} [${req.body.type}] (${req.body.year}) .mp3`;
          cb(null, data);
        },
      }),
    }),
  )
  async addMixtape(
    @UploadedFile() file: Express.Multer.File,
    @Body() MixtapeDto: MixtapeDto,
  ) {
    console.log(MixtapeDto);
    return 'succces';
  }
  @Get()
  async createPublishName(@Body() MixtapeDto: MixtapeDto) {
    this.mixtapeService.createPublishName(MixtapeDto);
  }
}
