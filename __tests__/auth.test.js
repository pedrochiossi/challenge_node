import request from 'supertest';
import app from '../src/app';

describe('Authentication', () => {
  it('should register a user in the database', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'someemail@2.com',
        password: '12345',
      });
    expect(response.body).toHaveProperty('id');
  });

  it('should not have empty fields at signup', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        password: '123456',
      });
    expect(response.status).toEqual(401);
  });

  it('should not register a user with duplicate emails', async () => {
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'someemail@2.com',
        password: '345629083',
      });
    expect(response.status).toEqual(400);
  });

  it('should authenticate registered user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'someemail@2.com',
        password: '12345',
      });
    expect(response.body).toHaveProperty('token');
  });

  it('should not authenticate user with wrong password', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'someemail@2.com',
        password: '12uhgd6',
      });
    expect(response.status).toEqual(401);
  });

  it('should not authenticate user with wrong email', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'email@2.com',
        password: '12345',
      });
    expect(response.status).toEqual(401);
  });

  it('should not have empty fields at login', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '',
        password: '12345',
      });
    expect(response.status).toEqual(401);
  });
});
