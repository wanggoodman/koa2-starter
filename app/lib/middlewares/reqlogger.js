module.exports = function *(next){
  console.log('%s - %s %s',new Date().toISOString(), this.req.method, this.req.url);
  yield next;
}

export default function reqLogger() {
  return async (ctx, next) => {

  }
}
