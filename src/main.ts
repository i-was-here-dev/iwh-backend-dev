import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, UnprocessableEntityException, ValidationError, ValidationPipe } from '@nestjs/common';

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
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
