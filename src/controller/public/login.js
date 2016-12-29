// @flow
const login = async(ctx: Object) => {

  ctx.state = {
    active_login: true,
    title: 'Login Page',
    user: ctx.state.user,
  };

  await ctx.render('login', {
    partials: {
      head: './partials/head',
      header: './partials/header',
      footer: './partials/footer'
    },
  });
  
};

export default login;
