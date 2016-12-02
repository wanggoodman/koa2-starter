import Koa from 'koa';
import koaRouter from 'koa-router';
import serve from 'koa-static';
import views from 'koa-views';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import convert from 'koa-convert';

import router from './router';

const app = new Koa();

app.use(views(__dirname + '/views', {
  map: {
    html: 'ejs'
  }
}));


app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(async (ctx, next) => {
  console.log('before next');
  await next();
  console.log('after next');
});
/*
app.use(async (ctx, next) => {
  try {
    await next();
    // Handle 404 upstream.
    const status = ctx.status || 404;
    if (status === 404) ctx.throw(404);
  } catch (error) {
    ctx.status = error.status || 500;
    if (ctx.status === 404) {
      await ctx.render('error/404', { error });
    } else {
      await ctx.render('error/error', { error });
    }
    ctx.app.emit('error', error, ctx);
  }
})
*/
app.use(convert(session(app)));
app.keys = ['verysecretyes'];
app.use(bodyParser());
app.use(serve(__dirname + '/public'));

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);
