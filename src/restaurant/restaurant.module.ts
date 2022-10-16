import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { RestaurantRepository } from './restaurant.repository';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantService, RestaurantRepository]
})
export class RestaurantModule {}
