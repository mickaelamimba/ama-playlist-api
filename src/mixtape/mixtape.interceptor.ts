import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class MixtapeInterceptor implements NestInterceptor {
  constructor(private fileName: string) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}
