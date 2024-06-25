import { createMockContext } from '@shopify/jest-koa-mocks';
import { Context } from 'koa';
import { userControllerLogin, userControllerLogout, userControllerRefreshToken } from './index';

describe('USER:', () => {
  it('should fail on user not found', async () => {
    const context: Context = createMockContext({
      requestBody: {
        user: 'test',
        password: '123456'
      },
      throw: (text: string) => {
        throw new Error(text);
      }
    });
    await expect(userControllerLogin(context)).rejects.toThrowError('invalid username or password');
  });

  it('should fail on session not found', async () => {
    const context: Context = createMockContext({
      requestBody: {
        refreshToken: 'test'
      },
      throw: (text: string) => {
        throw new Error(text);
      }
    });
    await expect(userControllerRefreshToken(context)).rejects.toThrowError('invalid session key');
  });

  it('should successfully logout', async () => {
    const context: Context = createMockContext({
      state: {
        user: {
          session: '66281fef53379ff1bad67365'
        }
      },
    });
    await userControllerLogout(context);
    expect((context.body as any).success).toBe(true);
  });
});
