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

  @Get('findById/:id')
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @Post('create')
  create(@Body() product: Product) {
    return this.service.create(product);
  }

  @Put('update/:id')
  update(@Param() params, @Body() product: Product) {
    return this.service.update(params.id, product);
  }

  @Delete('delete/:id')
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
}
