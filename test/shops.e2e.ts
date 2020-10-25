import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

export default function ShopsTest() {
  describe('ShopsController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    const shop = {
      name: 'Shop',
      location: {
        latitude: -22.25,
        longitude: -45.55,
      },
      imageUrl: 'http://shopImage-1.jpg',
    };
    const newShop = {
      name: 'NewShop 2',
      location: {
        latitude: -22.25,
        longitude: -45.55,
      },
      imageUrl: 'http://shopImage-2.jpg',
    };

    let shopId;

    it('POST /shops', async () => {
      const res = await request(app.getHttpServer())
        .post('/shops')
        .send(shop)
        .expect(201);

      expect(res.body.name).toEqual(shop.name);
      expect(res.body.location).toEqual(shop.location);
      expect(res.body.imageUrl).toEqual(shop.imageUrl);

      shopId = res.body._id;
    });

    it('GET /shops', async () => {
      const res = await request(app.getHttpServer())
        .get(`/shops`)
        .expect(200);

      expect(res.body[0].name).toEqual(shop.name);
      expect(res.body[0].location).toEqual(shop.location);
      expect(res.body[0].imageUrl).toEqual(shop.imageUrl);
      expect(res.body[0]._id).toEqual(shopId);
      expect(res.body).toHaveLength(1);
    });

    it('GET /shops/:id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/shops/${shopId}`)
        .expect(200);

      expect(res.body.name).toEqual(shop.name);
      expect(res.body.location).toEqual(shop.location);
      expect(res.body.imageUrl).toEqual(shop.imageUrl);
      expect(res.body._id).toEqual(shopId);
    });

    it('PUT /shops/:id', async () => {
      const res = await request(app.getHttpServer())
        .put(`/shops/${shopId}`)
        .send(newShop)
        .expect(200);

      expect(res.body.name).toEqual(newShop.name);
      expect(res.body.location).toEqual(newShop.location);
      expect(res.body.imageUrl).toEqual(newShop.imageUrl);
      expect(res.body._id).toEqual(shopId);
    });

    it('DELETE /shops/:id', async () => {
      await request(app.getHttpServer())
        .delete(`/shops/${shopId}`)
        .expect(200);
    });
  });
}
