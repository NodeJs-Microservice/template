import { Context, Next } from 'koa';
import config from '../utils/config';

const permissions: any = {};

Object.keys(config.permissions).forEach((key) => {
  permissions[key] = {};
  config.permissions[key].forEach((item: string) => {
    permissions[key][item] = true;
  });
});

export default (path: string) =>
  async (ctx: Context, next: Next): Promise<void> => {
    if (!permissions[path] || (!permissions[path]['*'] && !permissions[path][ctx.state.user?.userType])) {
      ctx.throw('invalid permission');
    }
    await next();
  };
