const request = require('supertest');
const app = require('../server');

describe('Order Service Health', () => {
  it('should return 200 on /health', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});