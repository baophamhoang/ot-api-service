import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

export class SwaggerDocs {
  public static assign(app: INestApplication) {
    // TODO: Move this into config file
    const config = new DocumentBuilder()
      .setTitle('OT Api Service')
      .setDescription('The OT Api Service')
      .setVersion('1.0')
      .addTag('OT Api Service')
      .build();

    const options: SwaggerDocumentOptions = {
      operationIdFactory: (controllerKey, methodKey) => {
        return controllerKey;
      },
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api-svc/swagger', app, document);
  }
}
