require("babel-polyfill");
import Koa from 'koa';
import koaRouter from 'koa-router';
import serve from 'koa-static';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import convert from 'koa-convert';
import compression from 'koa-compress';
import favicon from 'koa-favicon';

import passport from './lib/passport';
import router from './router';
import errorHandle from './lib/middlewares/errorHandle';
import reqLogger from './lib/middlewares/reqlogger';

const app = new Koa();

app.use(views(__dirname + '/views', {
  map: {
    hbs: 'handlebars',
  },
  extension: 'hbs',
}));
app.use(serve(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(reqLogger())
app.use(convert(session(app)));
app.use(compression());
app.use(bodyParser());
app.use(errorHandle())

app.keys = ['your-session-secret', 'another-session-secret'];

var SESSION_CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
};
app.use(session(SESSION_CONFIG, app));
app.use(passport.initialize())
app.use(passport.session())

app.use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
  .on('error', (err) => console.error(err))
