import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UsePipes } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { IsUUIDParam } from 'src/common/decorators/is-uuidparam.decorator';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  create(@Body() createRestaurant: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurant);
  }

  @ApiOperation({
    operationId: 'restaurant_findall',
    description: 'metodo que vai retornar todos os restaurantes cadastrados'
  })
  @ApiOkResponse({
    description: 'Restaurant created with success',
  })
  @Get()
  findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  findOne(@IsUUIDParam('id') id: string) {
    return this.restaurantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurant: UpdateRestaurantDto) {
    return this.restaurantService.update(id, updateRestaurant);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }
}
