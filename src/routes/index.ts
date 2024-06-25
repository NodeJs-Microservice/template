import Router from '@koa-better-modules/joi-router';
import healthCheckRouter from './healthCheck';
import userRouter from './user';

const router = new Router();

router.use(healthCheckRouter.middleware());
router.use(userRouter.middleware());

export default router;
