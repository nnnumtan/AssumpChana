const joi = require('joi');

const environmentSchema = {
  NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
  HOST: joi.string().required(),
  PORT: joi.number().default(8000),

  /* Logging */
  LOG_LEVEL: joi.string().required(),
  LOG_DB_QUERY: joi.boolean().required(),
  LOG_STACKDRIVER_CREDENTIALS: joi.string().optional().allow(''),

  /* Database Firestore */
  FIRESTORE_PROJECT_ID: joi.string().required(),
  FIRESTORE_GOOGLE_CREDENTIALS: joi.string().required(),

  /* Line Notify */
  LINE_NOTIFY_URL: joi.string().required(),
};

const validateEnvironmentSchema = joi.object().keys(environmentSchema).unknown();

const { value, error } = validateEnvironmentSchema.prefs({ errors: { label: 'key' } }).validate(process.env, { stripUnknown: true });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const environment = value;

module.exports = {
  env: environment.NODE_ENV,
  host: environment.HOST,
  port: environment.PORT,
  logLevel: environment.LOG_LEVEL,
  logQuery: environment.LOG_DB_QUERY,
  logStackDriverCredentials: environment.LOG_STACKDRIVER_CREDENTIALS,
  lineNotify: {
    url: environment.LINE_NOTIFY_URL
  },
  firestore: {
    projectId: environment.FIRESTORE_PROJECT_ID,
    keyFilename: environment.FIRESTORE_GOOGLE_CREDENTIALS,
  }
};
