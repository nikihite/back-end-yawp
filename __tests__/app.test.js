const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  firstName: 'Niki',
  lastName: 'Hite',
  email: 'niki@hite.com',
  password: '12345',
};

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates and signs in a new user', async () => {
    const res = await request(app).post('/api/v1/users/')
      .send(mockUser);
    const { firstName, lastName, email } = mockUser;
    
    expect(res.body).toEqual({
      Message: 'You are in!!',

      user: { id: expect.any(String),
        firstName,
        lastName,
        email, }
    });
  });

  afterAll(() => {
    pool.end();
  });
});
