import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from 'node:fs'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    bodyParser: true,
    
  });
  await app.listen(3000);
  
}
bootstrap();
