import fs from 'fs';

const api = async(ctx, next) => {
  ctx.type = 'application/json'
  ctx.status = 201;
  ctx.body = fs.createReadStream('./package.json')
}

export default api;
