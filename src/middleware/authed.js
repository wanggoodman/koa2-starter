// @flow
const authed = async(ctx: Object, next: () => Promise<any>) => {
  if(ctx.isAuthenticated()){
    await next();
  } else {
    ctx.redirect('/login');
  }
}

export default authed;
