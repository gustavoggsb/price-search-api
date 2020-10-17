import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { MongooseModule } from '@nestjs/mongoose'
import {ShopSchema} from './shops.model'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Shop',
        schema: ShopSchema,
      },
    ]),
  ],
  providers: [ShopsService],
  controllers: [ShopsController],
})
export class ShopsModule {}
