import Router from 'koa-router';
import fs from 'fs';

import authed from '../middleware/authed';

import home from '../controller/home';
import about from '../controller/about';
import profile from '../controller/profile';
import login from '../controller/login';
import styleguide from '../controller/styleguide';
import api from '../controller/api';

const router = new Router();

router.get('/', home);
router.get('/about', about);
router.get('/profile', authed, profile);
router.get('/login', login.page);
router.post('/login', login.post);
router.get('/styleguide', styleguide);
router.get('/api', api)
router.get('/logout', (ctx) => {
  ctx.logout()
  ctx.redirect('/')
})

export default router;
