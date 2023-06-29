import { Injectable } from '@nestjs/common';
import { MixtapeDto } from './mixtape.dto';
import * as mm from 'music-metadata';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class MixtapeService {
  FILES_DIR: string;
  constructor() {
    this.FILES_DIR = join(process.cwd(), 'files', 'music');
  }

  async addMusic(mixtapeDto: MixtapeDto, mixtapeFile) {
    try {

      const metadata = await mm.parseBuffer(mixtapeFile.buffer, 'audio/mpeg');
      const title = await this.createPublishName(mixtapeDto);
      metadata.common.title = title;
      metadata.common.album = `${mixtapeDto.name}`;
      metadata.common.artist = `${mixtapeDto.djName}`;
     
      fs.writeFile(
        `${this.FILES_DIR}/${title}.mp3`,
        mixtapeFile.buffer,
        (err) => {
          if (err) {
            console.error(
              "Une erreur s'est produite lors de l'enregistrement du fichier :",
              err,
            );
          } else {
            console.log('Le fichier a été enregistré avec succès.');
          }
        },
      );
      return title;
    } catch (error) {
      console.log(error);
    }
  }
  async createPublishName({ djName, name, type, year }: MixtapeDto) {
    return `${djName} - ${name} [${type}] (${year})`.toUpperCase();
  }
}
