const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('./models/user');
const fixtures = require('./fixtures');
const app = require('./app');

const request = supertest(app);
const MONGO_URL = 'mongodb://localhost:27017/aroundb';

beforeAll(() => mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}));

afterAll(() => mongoose.disconnect());

describe('Database tests', () => {
  beforeEach(() => {
    const { email, password } = fixtures.user;

    return User.create({
      email,
      password,
    });
  });

  afterEach(() => User.deleteOne({ email: fixtures.user.email }));

  it('The user must be complete', () => User.findOne({ email: fixtures.user.email }).then((user) => {
    expect(user).toBeDefined();
    expect(user.email).toBe(fixtures.user.email);
  }));
});
