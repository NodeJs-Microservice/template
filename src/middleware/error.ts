import { Context, Next } from 'koa';

export default async (ctx: Context, next: Next): Promise<void> => {
  try {
    if (ctx.invalid) {
      ctx.status = 400;
      ctx.body = {
        status: 0,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        message: ctx.invalid.body.details
          .map((x: any): string => (x.message as string) || 'Unknown error')
          .join(',') as string
      };
      return;
    }
    await next();
  } catch (err: any) {
    if (ctx.status === 200) {
      ctx.status = 400;
    }
    ctx.body = {
      status: 0,
      message: (err.message as string) || 'Unknown error'
    };
  }
};
