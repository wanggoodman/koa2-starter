import Koa from 'koa';
import koaRouter from 'koa-router';
import serve from 'koa-static';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import convert from 'koa-convert';

import router from './router';
import errorHandle from './lib/middlewares/errorHandle';

const app = new Koa();

app.use(views(__dirname + '/views', {
  map: {
    hbs: 'handlebars',
  },
  extension: 'hbs',
}));

app.use(convert(session(app)));
app.keys = ['verysecretkeys'];
app.use(bodyParser());
app.use(serve(__dirname + '/public'));
app.use(errorHandle())

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
