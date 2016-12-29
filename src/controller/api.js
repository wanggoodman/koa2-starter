// @flow
import fs from 'fs';

const api = async(ctx: Object) => {
  ctx.type = 'application/json';
  ctx.status = 201;
  ctx.body = fs.createReadStream('./package.json');
};

export default api;
