import Router from 'koa-router';

const router = new Router();

router.get('/',  async(ctx, next) => {
  //ctx.state = {
    //session: this.session,
    //title: 'Koa 2 Starter Kit'
  //};

  await ctx.render('index', {
    active_home: true,
    title: 'Koa 2 Starter Kit',
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
