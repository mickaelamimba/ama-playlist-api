import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { MixtapeDto } from './mixtape.dto';
import { MixtapeService } from './mixtape.service';

import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

interface MixtapeFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

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
  async addMixtape(
    //@ts-ignore
    @UploadedFiles() files: Express.Multer.File<MixtapeFile[]>,
    @Body() mixtapeDto: MixtapeDto,
  ) {
    const mixtapeFile = files.mixtape[0];
    
    return await this.mixtapeService.addMusic(mixtapeDto, mixtapeFile);
  }
  @Get()
  async createPublishName(@Body() MixtapeDto: MixtapeDto) {
    this.mixtapeService.createPublishName(MixtapeDto);
  }
}
