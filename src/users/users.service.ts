import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(doc: User) {
    const result = await new this.userModel(doc).save();
    return result;
  }

  async findAll() {
    const result = await this.userModel.find();
    return result;
  }

  async findById(id: number) {
    const result = await this.userModel.findById(id);
    return result;
  }

  async update(id: number, doc: User) {
    const result = await this.userModel.findByIdAndUpdate(id, doc);
    return result;
  }

  async remove(id: number) {
    await this.userModel.findByIdAndRemove(id);
  }
}
