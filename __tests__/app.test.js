const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Niki',
  lastName: 'Hite',
  email: 'niki@hite.com',
  password: '12345',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
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

  it('signs in an existing user', async () => {
    await request(app).post('/api/v1/users').send(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: 'niki@hite.com', password: '12345' });
    expect(res.status).toEqual(200);
  });

  it('shows list of users', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.get('/api/v1/users');
    expect(res.status).toBe(200);
  });

  it('shows list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.status).toBe(200);
  });

  it('should return data from single restaurant review', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    expect(res.body).toHaveProperty('id', '1');
    expect(res.body).toHaveProperty('name', 'Thai Tanic');
    expect(res.body).toHaveProperty('style', 'Thai');
    expect(res.body).toHaveProperty('rating', 3);
    expect(res.body.reviews[0]).toHaveProperty('id', '3');
  });

  it('should create a new review for authorized user', async () => {
    const newReview = {
      'rating': 1,
      'details': 'the tacos sucked',
      'restaurant_id': '5',
    };
    const [agent] = await registerAndLogin();
    const res = await agent.post('/api/v1/restaurants/5/reviews').send(newReview);
    expect(res.body).toEqual({
      id: expect.any(String), ...newReview
    });
  });

  it('should delete review for authorized user', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.delete('/api/v1/reviews/3');
    expect(res.status).toBe(200);
    const reviewResp = await request(app).get('/api/v1/reviews/3');
    expect(reviewResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
