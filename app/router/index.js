import Router from 'koa-router';
import fs from 'fs';

import authed from '../lib/middlewares/authed';

import home from './home';
import about from './about';
import profile from './profile';
import login from './login';
import styleguide from './styleguide';

const router = new Router();

router.get('/', home);
router.get('/about', about);
router.get('/profile', authed, profile);
router.get('/login', login.page);
router.post('/login', login.post);
router.get('/styleguide', styleguide);
router.get('/logout', (ctx) => {
  ctx.logout()
  ctx.redirect('/')
})
router.get('/api', async(ctx, next) => {
  ctx.type = 'application/json'
  ctx.status = 201;
  ctx.body = fs.createReadStream('./package.json')
})

export default router;
