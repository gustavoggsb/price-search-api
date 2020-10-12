import { ProductsService } from './products.service';
import { Product } from './products.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @Post()
  create(@Body() product: Product) {
    return this.service.create(product);
  }

  @Put(':id')
  update(@Param() params, @Body() product: Product) {
    this.service.update(params.id, product);
    return this.service.findById(params.id);
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
}
