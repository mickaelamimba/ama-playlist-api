import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class MixtapeInterceptor implements NestInterceptor {
  fileInterceptor: NestInterceptor;
  constructor(private fileName: string) {
    const multerOptions: MulterOptions = {
      storage: diskStorage({
        destination: './files/music',
        filename: (req, file, cb) => {
          console.log('req:', req.body, file);
          const data = `${req.body.djName} - ${req.body.name} [${req.body.type}] (${req.body.year}).mp3`;
          cb(null, data);
        },
      }),
    };
    this.fileInterceptor = new (FileInterceptor(
      this.fileName,
      multerOptions,
    ))();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.fileInterceptor.intercept(context, next);

    return next.handle();
  }
}
