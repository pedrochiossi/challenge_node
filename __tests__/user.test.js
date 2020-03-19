import request from 'supertest';
import app from '../src/app';


let token;
beforeAll(async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({
      email: 'euemail@2.com',
      password: '123456',
    });
  const response = await request(app)
    .post('/api/v1/auth/login')
    .send({
      email: 'euemail@2.com',
      password: '123456',
    });
  token = response.body.token;
});


describe('User enpoints', () => {
  it('should not call enpoint /full-name', async () => {
    const response = await request(app)
      .post('/api/v1/user/full-name')
      .send({
        token,
        data: {
          firstName: 'Pedro',
          lastName: 'De Morais Chiossi',
        },
      });
    expect(response.status).toEqual(400);
  });

  it('should store a valid CPF number', async () => {
    const response = await request(app)
      .post('/api/v1/user/cpf')
      .send({
        token,
        data: '07907075947',
      });
    expect(response.body.success).toEqual(true);
    // expect(response['next-end-point']).toEqual('full-name');
  });

  it('should not store invalid CPF', async () => {
    const response = await request(app)
      .post('/api/v1/user/cpf')
      .send({
        token,
        data: '12345678929',
      });
    expect(response.status).toEqual(400);
  });

  it('should not store CPF longer than 11 digits', async () => {
    const response = await request(app)
      .post('/api/v1/user/cpf')
      .send({
        token,
        data: '123456788909198090',
      });
    expect(response.status).toEqual(400);
  });

  it('should not call enpoint /birthday', async () => {
    const response = await request(app)
      .post('/api/v1/user/birthday')
      .send({
        token,
        data: '13/06/1993',
      });
    expect(response.status).toEqual(400);
  });

  it('should store user\'s full name', async () => {
    const response = await request(app)
      .post('/api/v1/user/full-name')
      .send({
        token,
        data: {
          firstName: 'Pedro',
          lastName: 'De Morais Chiossi',
        },
      });
    expect(response.body.success).toEqual(true);
  });

  it('should not call endpoint /phone-number', async () => {
    const response = await request(app)
      .post('/api/v1/user/phone-number')
      .send({
        token,
        data: 90989804910,
      });
    expect(response.status).toEqual(400);
  });

  it('should store user\'s birthday', async () => {
    const response = await request(app)
      .post('/api/v1/user/birthday')
      .send({
        token,
        data: '15/04/1985',
      });
    expect(response.body.success).toEqual(true);
  });

  it('should not call endpoint /address', async () => {
    const response = await request(app)
      .post('/api/v1/user/address')
      .send({
        token,
        data: {
          cep: '04019080',
          street: 'Rua Professor Murtinho',
          number: 44,
          complement: '',
          city: 'São Paulo',
          state: 'SP',
        },
      });
    expect(response.status).toEqual(400);
  });

  it('should store a phone number', async () => {
    const response = await request(app)
      .post('/api/v1/user/phone-number')
      .send({
        token,
        data: 90989804910,
      });
    expect(response.body.success).toEqual(true);
  });

  it('should not call endpoint /amount-requested', async () => {
    const response = await request(app)
      .post('/api/v1/user/amount-requested')
      .send({
        token,
        data: 900000000,
      });
    expect(response.status).toEqual(400);
  });


  it('should store a valid Address in database', async () => {
    const response = await request(app)
      .post('/api/v1/user/address')
      .send({
        token,
        data: {
          cep: '04019080',
          street: 'Rua Professor Murtinho',
          number: 44,
          complement: '',
          city: 'São Paulo',
          state: 'SP',
        },
      });
    expect(response.body.success).toEqual(true);
  });
  it('should not store an invalid Address in database', async () => {
    const response = await request(app)
      .post('/api/v1/user/address')
      .send({
        token,
        data: {
          cep: '04019089',
          street: 'Rua Professor Murt',
          number: 44,
          complement: '',
          city: 'São Paulo',
          state: 'SP',
        },
      });
    expect(response.body.success).toEqual(false);
  });

  it('should store a requested amount for a loan', async () => {
    const response = await request(app)
      .post('/api/v1/user/amount-requested')
      .send({
        token,
        data: 900000000,
      });
    expect(response.body.success).toEqual(true);
  });
});
