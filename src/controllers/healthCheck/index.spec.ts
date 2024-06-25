import { createMockContext } from '@shopify/jest-koa-mocks';
import { healthCheck } from './index';
import { Context } from 'koa';

describe('HealthCheck:', () => {
  it('get status 200', () => {
    const context: Context = createMockContext();
    healthCheck(context);
    expect(context.status).toBe(200);
    expect((context.body as any).ok).toBe(true);
  });
});
