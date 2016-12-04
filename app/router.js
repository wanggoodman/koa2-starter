require("babel-polyfill");
import Router from 'koa-router';
import fs from 'fs';

import passport from './lib/passport';

const router = new Router();

router.get('/', async(ctx, next) => {
  const title = await Promise.resolve('Koa 2 Starter Kit')
  ctx.state = {
    title,
    active_home: true,
    subtitle: 'Hello',
    user: ctx.state.user,
  }
  await ctx.render('index', {
    partials: {
      head: './partials/head',
      header: './partials/header',
      footer: './partials/footer'
    },
  });
});

router.get('/about', async (ctx, next) => {
  ctx.state = {
    active_about: true,
    title: 'About Page',
    subtitle: 'Hello',
    user: ctx.state.user,
  }
  await ctx.render('about', {
    partials: {
      head: './partials/head',
      header: './partials/header',
      footer: './partials/footer'
    },
  });
})

router.get('/profile', async (ctx, next) => {
  ctx.state = {
    active_profile: true,
    title: 'My Profile',
    user: ctx.state.user,
  }
  await ctx.render('profile', {
    partials: {
      head: './partials/head',
      header: './partials/header',
      footer: './partials/footer'
    },
  });
})

router.get('/login', async (ctx, next) => {
  ctx.state = {
    active_login: true,
    title: 'Login Page',
    user: ctx.state.user,
  }
  await ctx.render('login', {
    partials: {
      head: './partials/head',
      header: './partials/header',
      footer: './partials/footer'
    },
  });
})

router.post('/login', async(ctx, next) => {
  return passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })(ctx, next)
})

router.get('/logout', (ctx) => {
  ctx.logout()
  ctx.redirect('/')
})

router.get('/styleguide', async (ctx, next) => {
  ctx.state = {
    active_styleguide: true,
    title: 'Documentationn Page',
    user: ctx.state.user,
  }
  await ctx.render('styleguide', {
    partials: {
      head: './partials/head',
      header: './partials/header',
      footer: './partials/footer'
    },
  });
})

router.get('/api', async(ctx, next) => {
  ctx.type = 'application/json'
  ctx.body = fs.createReadStream('./package.json')
})

export default router;
