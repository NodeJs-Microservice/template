import Router from '@koa-better-modules/joi-router';
import { handleError } from '../middleware';
import { healthCheck } from '../controllers';

const router = new Router();

router.route({
  method: 'GET',
  path: '/.well-known/healthcheck.json',
  handler: [handleError, healthCheck]
});

export default router;
