import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Doctor Door')
  .setDescription(' API Referneces')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  app.enableCors();
  await app.listen(process.env.PORT);
  console.log("server is listening to "+process.env.PORT)
}
bootstrap();
