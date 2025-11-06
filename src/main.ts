import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './infrastructure/openapi/configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[]) => {
        for (const validationError of validationErrors) {
          if (Object.prototype.hasOwnProperty.call(validationError.constraints, 'isNotEmpty')) {
            throw new BadRequestException('Required parameters are missing');
          }
        }

        const firstError = validationErrors[0];
        const message = firstError?.constraints ? Object.values(firstError.constraints)[0] : 'Validation failed';
        return new UnprocessableEntityException(message);
      },
    }),
  );

  SwaggerConfig.setup(app);
  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Application is running on: http://localhost:3000');
  console.log('📚 Swagger UI available at: http://localhost:3000/api-docs');
}
bootstrap();
