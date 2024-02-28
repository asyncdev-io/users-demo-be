import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Users')
    .setDescription('The users API asyncdev')
    .setVersion('1.0')
    .addTag('users')
    .addTag("Auth")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(cors()); // Enable CORS with default settings
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
