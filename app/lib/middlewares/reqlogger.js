export default function reqLogger() {
  return async (ctx, next) => {
    // filter browsersync requests
    if(ctx.url.split('/')[1] !== 'sockjs-node'){
        console.log('%s - %s %s',new Date().toISOString(), ctx.method, ctx.url);
    }
    await next();
  }
}
