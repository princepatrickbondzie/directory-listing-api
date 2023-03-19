import { NestFactory } from '@nestjs/core';
import { Config } from './config/config';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: false });

  const options = new DocumentBuilder()
    .setTitle('WooBiz')
    .setDescription('WooBiz API Documentation')
    .setVersion('0.1')
    // .addServer('http://localhost:3000')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(Config.PORT);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
