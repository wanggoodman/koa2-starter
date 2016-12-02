import Router from 'koa-router';

const router = new Router();

router.get('/',  async(ctx, next) => {
  ctx.state = {
    //session: this.session,
    title: 'Koa 2 Starter Kit'
  };

  await ctx.render('index', {
    user: 'John'
  });
});

router.get('/about', async (ctx, next) => {
  ctx.state = {
    //session: this.session,
    title: 'About Page'
  };

  await ctx.render('about', {
    user: 'John'
  });
})

router.get('/login', async (ctx, next) => {
  ctx.state = {
    //session: this.session,
    title: 'Login Page'
  };

  await ctx.render('login', {
    user: 'John'
  });
})


router.get('/documentation', async (ctx, next) => {
  ctx.state = {
    //session: this.session,
    title: 'Documentationn Page'
  };

  await ctx.render('documentation', {
    user: 'John'
  });
})

export default router;
