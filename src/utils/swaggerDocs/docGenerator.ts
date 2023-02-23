import path from 'path';
import swaggerJsDoc from 'swagger-jsdoc';
import { config } from '../../config';

const swaggerOptions = {
  swaggerDefinition: {
    components: {},
    openapi: config.get('swaggerDocs.openapiVersion'),
    info: {
      version: config.get('swaggerDocs.docsVersion'),
      title: config.get('swaggerDocs.docsTitle'),
      description: config.get('projectId'),
      contact: {
        name: config.get('projectId'),
      },
      servers: [`${config.get('ip')}:${config.get('port')}`],
    },
  },
  apis: [
    path.join(__dirname, '../../entities/*/router.js'),
    path.join(__dirname, '../../entities/*/router.ts'),
  ]
};

export default swaggerJsDoc(swaggerOptions);
