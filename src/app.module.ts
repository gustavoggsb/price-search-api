import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ShopsModule } from './shops/shops.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    ShopsModule,
    MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb://localhost:27017', { useFindAndModify: false}),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
