import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* Para establecer un prefijo global para todas las rutas */
  app.setGlobalPrefix('api/v1');

  /* Configuración global de validación */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no esten en el DTO
      forbidNonWhitelisted: true, // Arroja un error si hay propiedades no definidas en el DTO
      transform: true, // Transforma los tipos primitivos segun el DTO
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /* Aplicar Serialización Global (p/ej para @Exclude password) */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  /* Configuración de Swagger */
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('API REST para gestión de blog con usuarios, posts y categorías')
    .setVersion('1.0')
    .addTag('auth', 'Autenticación de usuarios')
    .addTag('users', 'Gestión de usuarios')
    .addTag('posts', 'Gestión de posts')
    .addTag('categories', 'Gestión de categorías')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Ingresa el token JWT',
        in: 'header',
      },
      'JWT-auth', // Este es el nombre que usaremos en los decoradores
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    jsonDocumentUrl: 'swagger/json' /* para que swagger pueda obtener el json */,
  });

  /* Configuración de Helmet */
  app.use(helmet());

  /* Configuración de CORS */
  app.enableCors({
    origin: '*',
  });

  await app.listen(app.get(ConfigService).get('PORT') ?? 3000);
}
bootstrap();
