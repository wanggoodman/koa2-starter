const about = async (ctx, next) => {

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

}

export default about;
