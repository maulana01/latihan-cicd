/** @format */

const { user_game, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
require('../controllers/user_game_api');
const request = require('supertest');
const app = require('../app');

describe('User Games API Controller Testing', () => {
  beforeAll(async () => {
    // await request(app).post('/api/register').send({ username: 'malik', password: 'malik' });
    // const login = await request(app).post('/api/login').send({ username: 'malik', password: 'malik' });
    // token = login.body.token;
  });

  afterAll(async () => {
    try {
      await sequelize.query('TRUNCATE user_games, user_game_biodata, user_game_histories RESTART IDENTITY;', { type: QueryTypes.RAW });
    } catch (error) {
      console.log(error);
    }
  });

  test('Get Semua user game tapi kosong', async () => {
    const { statusCode, body } = await request(app).get('/api/usergames');
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('User Game Tidak di temukan');
  });

  test('Get Semua user game', async () => {
    const inputUserGames = await user_game.create({ username: 'admin', password: 'admin' });

    const { body, statusCode } = await request(app).get('/api/usergames');
    expect(statusCode).toEqual(200);
    // expect(body.message).toEqual('Berhasil');
    expect(body.result[body.result.length - 1].username).toEqual(inputUserGames.username);
    expect(body.result[body.result.length - 1].password).toEqual(inputUserGames.password);
    expect(body.result).toHaveLength(1);
  });

  test('Ambil Satu Data dan berhasil', async () => {
    const { body, statusCode } = await request(app).get('/api/usergames/1');
    expect(statusCode).toEqual(200);
    expect(body.result.username).toEqual('admin');
    expect(body.result.password).toEqual('admin');
  });

  test('Ambil User game yang tidak diketahui ID nya dan gagal', async () => {
    const { body, statusCode } = await request(app).get('/api/usergames/500');
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('User Game dengan ID 500 Tidak di temukan');
  });

  test('Delete User game yang tidak diketahui ID nya dan gagal', async () => {
    const { body, statusCode } = await request(app).delete('/api/usergames/500');
    expect(statusCode).toEqual(404);
    expect(body.message).toEqual('User Game dengan ID 500 Tidak di temukan');
  });
});
