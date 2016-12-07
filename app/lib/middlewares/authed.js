
const authed = async (ctx, next) => {
  if(ctx.isAuthenticated()){
    await next();
  } else {
    ctx.redirect('/login');
  }
}

export default authed;
