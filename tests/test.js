const { describe, it, before } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const crypto = require('crypto');
const app = require('../app.js');
const CPF = require('cpf');

let validUser;


const invalidUser = {
  name: 'Invalid',
  email: 'invalid@email.com',
  password: '12345678',
  password2: '45678',
};

function createValidUser() {
  const validUser = {
    password: '12345678',
    password2: '12345678',
  };

  const hash = crypto.randomBytes(20).toString('hex');
  validUser.name = `${hash.slice(0, 5)}`;
  validUser.email = `valid-${hash}@email.com`;
  validUser.cpf = CPF.generate(false, false);
  validUser.birthDate = '2006-08-10';

  return validUser;
}

describe('Portal do Artista', () => {
  before(() => {
    validUser = createValidUser();
  });

  describe('User Endpoints', () => {
    describe('POST /auth/registro', () => {
      it('deve criar uma conta', async () => {
        const response = await request(app).post('/auth/registro').send(validUser);
        assert.strictEqual(response.statusCode, 200);
      });

      it('não deve criar uma conta que já existe', async () => {
        const response = await request(app).post('/auth/registro').send(validUser);
        assert.strictEqual(response.statusCode, 400);
      });
    });
  })

  describe('Sign in Endpoints', () => {
    describe('POST /auth/login', () => {
      it('deve fazer login com um usuario válido', async () => {
        const response = await request(app).post('/auth/login').send(validUser);
        assert.strictEqual(response.statusCode, 200);
      });

      it('não deve fazer login com um usuario invalido', async () => {
        const response = await request(app)
          .post('/auth/login')
          .send(invalidUser);
        assert.strictEqual(response.statusCode, 401);
      });
    });
  });

  describe('404 Endpoints', () => {
    describe('GET /unknown-endpoint', () => {
      it('deve mostrar 404', async () => {
        const response = await request(app).get(`/unknown-endpoint`);
        assert.strictEqual(response.statusCode, 404);
      });
    });
  });
})