// @flow
export default function reqLogger() {
  return async(ctx: Object, next: () => Promise<any>) => {
    const startTime = Date.now();

    await next();

    const timeToProcess = Date.now() - startTime;
    const fullUrl = `${ctx.protocol}://${ctx.host}${ctx.originalUrl}`;

    console.log(`${ctx.method} ${fullUrl} - ${timeToProcess}`);
  };
}
