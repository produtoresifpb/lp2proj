const { describe, it, before } = require('node:test');
const assert = require('node:assert');
const request = require('supertest');
const crypto = require('crypto');
const app = require('./app.js');

let createdNotice;
let validUser;

const newNotice = {
  title: 'Festival de Música 2024',
  organizador: 'Associação Cultural',
  description: 'Participe do maior festival de música do ano, com artistas renomados e novas promessas.',
  support: 'FINANCIAL',
  artisticCategory: 'MUSIC',
  subscriptionDeadline: '2024-05-01T23:59:59Z',
  criteriosSelecao: 'Análise de portfólio e proposta artística.',
  processoInscricao: 'Envio de propostas através do nosso site.',
  detalhesFinanciamento: 'Financiamento total para artistas selecionados.',
  valorFinanciamento: 15000.00,
};

const invalidUser = {
  name: 'Invalid',
  email: 'invalid@email.com',
  password: '12345678',
  confirmationPassword: '45678',
};

async function loadToken(user) {
  const response = await request(app).post('/auth/login').send(user);
  return response.body.token;
}

function createValidUser() {
  const validUser = {
    password: '12345678',
    confirmationPassword: '12345678',
  };

  const hash = crypto.randomBytes(20).toString('hex');
  validUser.name = `Valid ${hash}`;
  validUser.email = `valid-${hash}@email.com`;

  return validUser;
}

describe('Portal do Artista', () => {
  before(() => {
    validUser = createValidUser();
  });

  describe('User Endpoints', () => {
    describe('POST /auth/registro', () => {
      it('should create a new user', async () => {
        const response = await request(app).post('/auth/registro').send(validUser);
        assert.strictEqual(response.statusCode, 201);
      });

      it('should not create a new user with same email', async () => {
        const response = await request(app).post('/auth/registro').send(validUser);
        assert.strictEqual(response.statusCode, 400);
      });

      it('should not create a new user without email', async () => {
        const { name, password } = validUser;
        const response = await request(app)
          .post('/auth/registro')
          .send({ name, password });
        assert.strictEqual(response.statusCode, 400);
      });
    });

    describe('GET /profile', () => {
      it('should not show the current user without login', async () => {
        const response = await request(app).get('/profile');
        assert.strictEqual(response.statusCode, 401);
      });

      it('should show the current user', async () => {
        const token = await loadToken(validUser);
        const response = await request(app)
          .get('/profile')
          .set('Authorization', 'bearer ' + token);
        assert.strictEqual(response.statusCode, 200);
      });
    });
  });

  describe('Sign in Endpoints', () => {
    describe('POST /auth/login', () => {
      it('should login a valid user', async () => {
        const response = await request(app).post('/auth/login').send(validUser);
        assert.strictEqual(response.statusCode, 200);
      });

      it('should not login an invalid user', async () => {
        const response = await request(app)
          .post('/auth/login')
          .send(invalidUser);
        assert.strictEqual(response.statusCode, 401);
      });
    });
  });

  describe('Notice Endpoints', () => {
    describe('POST /api/editais/create', () => {
      it('should not create a new notice without login', async () => {
        const response = await request(app)
          .post('/api/editais/create')
          .send(newNotice);
        assert.strictEqual(response.statusCode, 401);
      });

      it('should create a new notice', async () => {
        const token = await loadToken(validUser);
        const response = await request(app)
          .post('/api/editais/create')
          .set('Authorization', 'bearer ' + token)
          .send(newNotice);
        createdNotice = response.body;
        assert.strictEqual(response.statusCode, 201);
      });

      it('should not create a new notice without title', async () => {
        const token = await loadToken(validUser);
        const { title, ...rest } = newNotice;
        const response = await request(app)
          .post('/api/editais/create')
          .set('Authorization', 'bearer ' + token)
          .send(rest);
        assert.strictEqual(response.statusCode, 400);
      });
    });

    describe('GET /edital', () => {
      it('should show all notices', async () => {
        const response = await request(app).get('/edital');
        assert.strictEqual(response.statusCode, 200);
      });

      it('should show a notice by id', async () => {
        const response = await request(app).get(`/edital/${createdNotice.id}`);
        assert.strictEqual(response.statusCode, 200);
        assert.strictEqual(response.body.title, createdNotice.title);
      });

      it('should not show a notice with invalid id', async () => {
        const response = await request(app).get(`/edital/x`);
        assert.strictEqual(response.statusCode, 400);
      });
    });
  });

  describe('404 Endpoints', () => {
    describe('GET /unknown-endpoint', () => {
      it('should show 404', async () => {
        const response = await request(app).get(`/unknown-endpoint`);
        assert.strictEqual(response.statusCode, 404);
      });
    });
  });
});