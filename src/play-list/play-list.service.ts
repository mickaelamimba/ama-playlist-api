import { Injectable } from '@nestjs/common';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface Music {
  number: number;
  title: string;
  artist: string;
}

@Injectable()
export class PlayListService {
  FILES_DIR: string;
  OUTPUT_DIR: string;

  constructor() {
    this.FILES_DIR = join(process.cwd(), 'files');
    this.OUTPUT_DIR = join(process.cwd(), 'output');
  }

  async addCsvPlayList() {
    return this.FILES_DIR;
  }

  async getCsvPlayLists() {
    const playListFiles = [];

    if (this.FILES_DIR) {
      const dir = await readdir(this.FILES_DIR);
      playListFiles.push(...dir.map((item) => ({ playList: item })));
    }

    return playListFiles;
  }

  async getCsvPlayList(filename: string) {
    const filesPath = `${this.FILES_DIR}/${filename}`;
    const files = await readFile(filesPath, 'utf8');
    const lines = files.split('\n');
    const songs = lines
      .map((line, index) => {
        const [title, artist] = line.split(/",/g);
        const number = (index + 1).toString().padStart(2, '0');
        if (!title || !artist) {
          return null;
        }

        return {
          number: number,
          title: title.replace(/"/g, ''),
          artist: artist.replace(/"/g, ''),
        };
      })
      .filter((song) => song !== null);

    return this.formatCsvPlayList(songs as unknown as Music[]);
  }

  async formatCsvPlayList(songs: Music[]) {
    const output = songs
      .map((song) => {
        const cleanTitle = song.title.replace(/\s*\(Explicit\)/, '').trim();
        return `${song.number} ${cleanTitle} - ${song.artist}`;
      })
      .join('\n');
    return output;
  }
  async export(filename: string, exportfilename: string) {
    const outputDir = `${this.OUTPUT_DIR}/${exportfilename}.txt`;
    const songList = await this.getCsvPlayList(filename);
    await writeFile(outputDir, songList);
  }
}
