import { Injectable } from '@nestjs/common';
import { MixtapeDto } from './mixtape.dto';

@Injectable()
export class MixtapeService {
  async createPublishName({ djName, name, type, year }: MixtapeDto) {
    return `${djName} - ${name} [${type}] (${year})`;
  }
}
