import passport from '../middleware/passport';

const page = async (ctx, next) => {

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
}

const post = async(ctx, next) => {

  return passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  })(ctx, next)

}

export default { page, post }
