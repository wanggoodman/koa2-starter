const joi = require('joi')
var redisStore = require('koa-redis')();

const envVarsSchema = joi.object({
  SESSION_KEY: joi.string()
    .required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  session: {
    key: envVars.SESSION_KEY,
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    store: redisStore
  }
}

module.exports = config
