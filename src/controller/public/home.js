// @flow
const home = async(ctx: Object) => {

  const title: string = await Promise.resolve('Koa 2 Starter Kit');

  ctx.state = {
    title,
    active_home: true,
    subtitle: 'Hello',
    user: ctx.state.user
  };

  await ctx.render('index', {
    partials: {
      head: './partials/head',
      header: './partials/header',
      footer: './partials/footer'
    },
  });

};

export default home;
