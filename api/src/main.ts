import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: '*', // Allow this origin
    credentials: true, // If you're using cookies, auth tokens, etc.
  });
  
  await app.listen(3000);
}
bootstrap();
