import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

export default function UsersTest() {
  describe('UsersController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    const user = {
      name: 'New User',
      email: 'newuser@example.com',
      password: '321',
    };

    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
      password: '321',
    };

    let userId;

    it('POST /users', async () => {
      const res = await request(app.getHttpServer())
        .post('/users')
        .send(user)
        .expect(201);

      expect(res.body.name).toEqual(user.name);
      expect(res.body.email).toEqual(user.email);
      userId = res.body._id;
    });

    it('GET /users', async () => {
      const res = await request(app.getHttpServer())
        .get(`/users`)
        .expect(200);

      expect(res.body[0].name).toEqual(user.name);
      expect(res.body[0].email).toEqual(user.email);
      expect(res.body[0]._id).toEqual(userId);
      expect(res.body).toHaveLength(1);
    });

    it('GET /users/:id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/users/${userId}`)
        .expect(200);

      expect(res.body.name).toEqual(user.name);
      expect(res.body.email).toEqual(user.email);
      expect(res.body._id).toEqual(userId);
    });

    it('PUT /users/:id', async () => {
      const res = await request(app.getHttpServer())
        .put(`/users/${userId}`)
        .send(newUser)
        .expect(200);

      expect(res.body.name).toEqual(newUser.name);
      expect(res.body.email).toEqual(newUser.email);
      expect(res.body._id).toEqual(userId);
    });

    it('DELETE /users/:id', async () => {
      await request(app.getHttpServer())
        .delete(`/users/${userId}`)
        .expect(200);
    });
  });
}
