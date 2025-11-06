import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export class SwaggerConfig {
  static setup(app: INestApplication): void {
    try {
      const openApiPath = path.join(process.cwd(), 'src/infrastructure/openapi/definitions/openapi-v1.yml');
      const openApiFile = fs.readFileSync(openApiPath, 'utf8');
      const openApiSpec = yaml.load(openApiFile) as any;

      SwaggerModule.setup('api-docs', app, openApiSpec, {
        swaggerOptions: {
          persistAuthorization: true,
          tagsSorter: 'alpha',
          operationsSorter: 'alpha',
        },
      });
    } catch (error) {
      console.error('❌ Failed to setup Swagger');
    }
  }
}
