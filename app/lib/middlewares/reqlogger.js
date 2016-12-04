export default function reqLogger() {
  return async (ctx, next) => {
  const startTime = Date.now();

  await next();

  const timeToProcess = Date.now() - startTime;
  const fullUrl = `${ctx.protocol}://${ctx.host}${ctx.originalUrl}`;

  console.log(`${ctx.method} ${fullUrl} - ${timeToProcess}`);
  }
}
