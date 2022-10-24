import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRestaurantRoleDto } from './dto/create-restaurant-role.dto';
import { RestaurantRoleDto } from './dto/restaurant-role.dto';

import { RestaurantRoleService } from './restaurant-role.service';

@ApiTags('restaurant-role')
@Controller('restaurant-role')
export class RestaurantRoleController {
  constructor(private readonly restaurantRestaurantRolesService: RestaurantRoleService) {}

  @Post()
  @ApiOperation({
    operationId: 'restaurantRestaurantRole_create',
    description: 'Endpoint to create a new restaurantRestaurantRole',
  })
  @ApiOkResponse({
    description: 'Success restaurantRestaurantRole created',
  })
  async create(
    @Body() createRestaurantRoleDto: CreateRestaurantRoleDto
  ): Promise<RestaurantRoleDto> {
    return this.restaurantRestaurantRolesService.create(createRestaurantRoleDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'restaurantRestaurantRole_findAll',
    description: 'Endpoint to find all',
  })
  async findAll(): Promise<RestaurantRoleDto[]> {
    return this.restaurantRestaurantRolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'restaurantRestaurantRole_findOne',
    description: 'Endpoint to create a new restaurantRestaurantRole',
  })
  @ApiOkResponse({
    description: 'Success restaurantRestaurantRole created',
  })
  @ApiNotFoundResponse({
    description: 'Was not able to find restaurantRestaurantRole',
  })
  async findOne(@Param('id') id: string) {
    return this.restaurantRestaurantRolesService.findOne(id);
  }

  @ApiOperation({
    operationId: 'restaurantRestaurantRole_delete',
    description: 'Endpoint to delete all',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.restaurantRestaurantRolesService.remove(id);
  }
}
