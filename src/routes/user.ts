import Router from '@koa-better-modules/joi-router';
import { handleAuth, handleError } from '../middleware';
import { userControllerLogin, userControllerLogout, userControllerUpdate } from '../controllers';

const router = new Router();

router.prefix('/user');

router.route({
  method: 'POST',
  path: '/login',
  validate: {
    type: 'json'
  },
  handler: [handleError, userControllerLogin]
});

router.route({
  method: 'POST',
  path: '/update',
  validate: {
    type: 'json'
  },
  handler: [handleError, handleAuth, userControllerUpdate]
});

router.route({
  method: 'POST',
  path: '/refresh-token',
  validate: {
    type: 'json'
  },
  handler: [handleError, userControllerUpdate]
});

router.route({
  method: 'GET',
  path: '/logout',
  handler: [handleError, handleAuth, userControllerLogout]
});

export default router;
