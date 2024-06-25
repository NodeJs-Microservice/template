import { createMockContext } from '@shopify/jest-koa-mocks';
import handleError from './error';
import { Context, Next } from 'koa';

describe('Middleware:ERROR:', () => {
  it('handles validation error', async () => {
    const next: Next = jest.fn(async () => {
      // call function
    });
    const context: Context = createMockContext({
      customProperties: {
        invalid: true
      }
    });
    await handleError(context, next);
    expect(context.status).toBe(400);
  });

  it('should catch error', async () => {
    const errorMessage = 'My error';

    const context: Context = createMockContext();

    const next: Next = jest.fn(() => {
      // call function
      context.status = 500;
      throw new Error(errorMessage);
    });
    await handleError(context, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(context.status).toBe(500);
    expect((context.body as any).status).toBe(0);
    expect((context.body as any).message).toBe(errorMessage);
  });

  it('should set default error code', async () => {
    const errorMessage = "This ain't no error boi";

    const context: Context = createMockContext();

    const next: Next = jest.fn(() => {
      context.status = 200;
      throw new Error(errorMessage);
    });
    await handleError(context, next);
    expect(next).toHaveBeenCalledTimes(1);
    expect(context.status).toBe(400);
    expect((context.body as any).status).toBe(0);
    expect((context.body as any).message).toBe(errorMessage);
  });
});
