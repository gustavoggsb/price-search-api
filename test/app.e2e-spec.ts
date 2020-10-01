import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { response } from 'express';
import { async } from 'rxjs';

describe('Products Controller (e2e)', async () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  const product = {
    name: 'Coca Cola',
    weight: 3.1,
    imageUrl: 'http://image-1.jpg',
  };

  const productNew = {
    name: 'Soda',
    weight: 2.75,
    imageUrl: 'http://image-2.jpg',
  };

  let productId;

  it('POST /product', async () => {
    const res = await request(app.getHttpServer())
      .post('/products')
      .send(product)
      .expect(201);

    expect(res.body.name).toEqual(product.name);
    expect(res.body.weight).toEqual(product.weight);
    expect(res.body.imageUrl).toEqual(product.imageUrl);

    productId = res.body._id;
  });

  it('GET /product/:id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/products/${productId}`)
      .expect(200);

    expect(res.body.name).toEqual(product.name);
    expect(res.body.weight).toEqual(product.weight);
    expect(res.body.imageUrl).toEqual(product.imageUrl);
  });

  it('PUT /product/:id', async () => {
    const res = await request(app.getHttpServer())
      .put(`/products/${productId}`)
      .send(productNew)
      .expect(200);

    expect(res.body.name).toEqual(productNew.name);
    expect(res.body.weight).toEqual(productNew.weight);
    expect(res.body.imageUrl).toEqual(productNew.imageUrl);
  });

  it('DELETE /product/:id', async () => {
    await request(app.getHttpServer())
      .delete(`/products/${productId}`)
      .expect(200);
  });
});
