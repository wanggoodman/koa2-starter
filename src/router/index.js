import Router from 'koa-router';

import authed from '../middleware/authed';

import { auth } from '../controller/auth';
import api from '../controller/api';
import {
  home,
  about,
  profile,
  styleguide,
  login
} from '../controller/public';

const router = new Router();

router.get('/', home);
router.get('/about', about);
router.get('/profile', authed, profile);
router.get('/login', login);
router.post('/login', auth);
router.get('/styleguide', styleguide);
router.get('/api', api);
router.get('/logout', (ctx) => {
  ctx.logout();
  ctx.redirect('/');
});

export default router;
