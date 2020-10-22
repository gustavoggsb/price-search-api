import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Shop, ShopDocument } from './shops.model';
import { Model } from 'mongoose';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel('Shop') private ShopModel: Model<ShopDocument>,
  ) {}

  async create(doc: Shop) {
    const result = await new this.ShopModel(doc).save();
    return result;
  }

  async findAll() {
    const result = await this.ShopModel.find();
    return result;
  }

  async findById(id: number) {
    const result = await this.ShopModel.findById(id);
    return result;
  }

  async update(id: number, doc: Shop) {
    const result = await this.ShopModel.findByIdAndUpdate(id, doc);
    return result;
  }

  async remove(id: number) {
    await this.ShopModel.findByIdAndRemove(id);
  }
}
