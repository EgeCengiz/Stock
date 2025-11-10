// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exception/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(3000);
}
void bootstrap();
