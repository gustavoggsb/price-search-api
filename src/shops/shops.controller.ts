import { ShopsService } from './shops.service';
import { Shop } from './shops.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('shops')
export class ShopsController {
  constructor(private service: ShopsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @Post()
  create(@Body() shop: Shop) {
    return this.service.create(shop);
  }

  @Put(':id')
  update(@Param() params, @Body() shop: Shop) {
    this.service.update(params.id, shop);
    return this.service.findById(params.id);
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
}
