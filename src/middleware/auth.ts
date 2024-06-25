import { Context, Next } from 'koa';
import { validateToken } from '../utils/jwt';

export default async (ctx: Context, next: Next): Promise<void> => {
  try {
    ctx.state.user = validateToken(ctx.request.headers.authorization?.replace('Bearer ', '') || '');
  } catch (err: any) {
    ctx.throw('invalid authorization token');
  }
  await next();
};
