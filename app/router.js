import Router from 'koa-router';

const router = new Router();

router.get('/',  async(ctx, next) => {
  ctx.state = {
    //session: this.session,
    title: 'Homexxx Page'
  };

  await ctx.render('index', {
    user: 'John'
  });
});

router.get('/test', async (ctx, next) => {
  ctx.state = {
    //session: this.session,
    title: 'About Pagexox'
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


export default router;
