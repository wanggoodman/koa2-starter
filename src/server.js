// @flow
import Koa from 'koa';
import koaRouter from 'koa-router';
import serve from 'koa-static';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import convert from 'koa-convert';
import compression from 'koa-compress';
import favicon from 'koa-favicon';
var redisStore = require('koa-redis')({
  // Options specified here
});

import config from './config';

import passport from './middleware/passport';
import router from './router';
import errorHandle from './middleware/errorHandle';
import reqLogger from './middleware/reqlogger';

const app = new Koa();

app.use(views(`${__dirname}/views`, {
  map: { hbs: 'handlebars' },
  extension: 'hbs',
}));
app.use(serve(`${__dirname}/public`));
app.use(favicon(`${__dirname}/public/favicon.ico`));
app.use(reqLogger())
app.use(convert(session(app)));
app.use(compression());
app.use(bodyParser())
app.use(errorHandle())

app.keys = ['your-session-secret', 'another-session-secret'];

app.use(session(config.session, app));
app.use(passport.initialize())
app.use(passport.session())

app.use(router.routes())
  .use(router.allowedMethods())
  .listen(config.server.port)
  .on('error', (err) => console.error(err))
