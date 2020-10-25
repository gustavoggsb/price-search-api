import { UsersService } from './users.service';
import { User } from './users.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.findById(params.id);
  }

  @Post()
  create(@Body() user: User) {
    return this.service.create(user);
  }

  @Put(':id')
  update(@Param() params, @Body() user: User) {
    this.service.update(params.id, user);
    return this.service.findById(params.id);
  }

  @Delete(':id')
  remove(@Param() params) {
    return this.service.remove(params.id);
  }
}
