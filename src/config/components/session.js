const joi = require('joi')

const envVarsSchema = joi.object({
  SESSION_KEY: joi.string()
    .required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}
/*SESSION_KEY=koasess
const SESSION_CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
};*/
const config = {
  session: {
    key: envVars.SESSION_KEY,
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
  }
}

module.exports = config
