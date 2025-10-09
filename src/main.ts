import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (validationErrors: ValidationError[]) => {
        const firstError: ValidationError = validationErrors[0];
        if (Object.prototype.hasOwnProperty.call(firstError.constraints, 'isNotEmpty')) {
          return new BadRequestException('Required parameters are missing');
        }

        return new UnprocessableEntityException(Object.values(firstError.constraints)[0]);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
