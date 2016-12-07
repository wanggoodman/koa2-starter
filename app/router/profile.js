const profile = async (ctx, next) => {

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
  
}

export default profile;
