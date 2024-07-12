import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerUi = new DocumentBuilder()
    .setTitle('Task-Manger')
    .setDescription('Task manger is made for user tasks management ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
