import version from '../../utils/version';
import { Context } from 'koa';

export const healthCheck = (ctx: Context): void => {
  const ok = true;
  const date = new Date();
  ctx.body = { ok, version, date };
};
