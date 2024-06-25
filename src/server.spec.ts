import supertest from 'supertest';
import app from './server';

describe('API:', () => {
  it('should call health api', async () => {
    const response = await supertest(app.callback()).get('/.well-known/healthcheck.json');
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });
  it('should say not found', async () => {
    const response = await supertest(app.callback()).get('/answer-to-the-universe');
    expect(response.status).toBe(404);
  });
});
