import Router from 'koa-router';
import fs from 'fs';
const router = new Router();

router.get('/test', async(ctx, next) => {
  ctx.type = 'application/json'
  ctx.body = fs.createReadStream('./package.json')
})

router.get('/', async(ctx, next) => {
  const title = await Promise.resolve('Koa 2 Starter Kit')
  await ctx.render('index', {
    active_home: true,
    title,
    subtitle: 'Hello',
    partials: {
      head: './head',
      header: './header',
      footer: './footer'
    },
  });
});

router.get('/about', async (ctx, next) => {
  await ctx.render('about', {
    active_about: true,
    title: 'About Page',
    subtitle: 'Hello',
    partials: {
      head: './head',
      header: './header',
      footer: './footer'
    },
  });
})

router.get('/login', async (ctx, next) => {

  await ctx.render('login', {
    active_login: true,
    title: 'Login Page',
    user: 'John',
    partials: {
      head: './head',
      header: './header',
      footer: './footer'
    },
  });
})


router.get('/styleguide', async (ctx, next) => {

  await ctx.render('styleguide', {
    active_styleguide: true,
    title: 'Documentationn Page',
    user: 'John',
    partials: {
      head: './head',
      header: './header',
      footer: './footer'
    },
  });
})

export default router;
