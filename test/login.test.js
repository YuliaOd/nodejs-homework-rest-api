const mongoose = require('mongoose');
require('dotenv').config();
const testRequest = require('supertest');

const app = require('../app');
const { User } = require('../models/user');
const { DB_TEST_HOST } = process.env;

const testUser = {
  email: 'user@mail.com',
  password: '123456',
};

describe('login', () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_TEST_HOST)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error(err.message);
      });

    await testRequest(app).post('/api/users/register').send(testUser);
  });

  it('should login', async () => {
    const response = await testRequest(app)
      .post('/api/users/login')
      .send(testUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.hasOwnProperty('token')).toBe(true);
    expect(typeof response.body.token).toBe('string');
  });

  afterAll(async () => {
    await User.deleteMany();

    await mongoose.disconnect(DB_TEST_HOST).then(() => {
      console.log('Database disconnected');
    });
  });
});