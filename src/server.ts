import Koa from 'koa';
import routes from './routes';

const app = new Koa();

app.use(routes.middleware());

export default app;
