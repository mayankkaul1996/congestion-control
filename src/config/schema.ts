export default {
  env: {
    doc: 'The application environment.',
    // TODO: use constants for different environments
    format: ['production', 'development', 'staging', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  projectId: {
    doc: 'The application project id.',
    format: String,
    default: 'congestion-calculator',
    env: 'PROJECT_ID',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port',
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  mongodbUri: {
    doc: 'Mongo DB URI', //ideally should be a nested object with other mongo configurations
    format: String,
    default: '',
    env: 'MONGO_URI',
  },
  swaggerDocs: {
    openapiVersion: {
      doc: 'The openapi version used for swagger documentation',
      format: String,
      env: 'SWAGGER_DOCS_OPENAPI_VERSION',
      default: '3.0.0',
    },
    docsVersion: {
      doc: 'The swagger documentation version',
      format: String,
      env: 'SWAGGER_DOCS_VERSION',
      default: '1.0.0',
    },
    docsTitle: {
      doc: 'The swagger documentation title',
      format: String,
      env: 'SWAGGER_DOCS_TITLE',
      default: 'Congestion Tax Calculator',
    },
    swaggerEnvs: {
      doc: 'Swagger Envs allowed',
      format: Array,
      env: 'SWAGGER_ENV',
      default: ['development', 'staging'],
    },
  },
};
