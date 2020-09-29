import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './products.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}

  async create(doc: Product) {
    const result = await new this.productModel(doc).save();
    return result;
  }

  async findById(id: number) {
    const result = await this.productModel.findById(id);
    return result;
  }

  async update(id: number, doc: Product) {
    const result = await this.productModel.findByIdAndUpdate(id, doc)
    return result;
  }

  async remove(id: number) {
    await this.productModel.findByIdAndRemove(id);
  }
}
