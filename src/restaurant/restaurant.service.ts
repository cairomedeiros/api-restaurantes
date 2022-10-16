import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantRepository } from './restaurant.repository';

@Injectable()
export class RestaurantService {

  constructor(private restaurantRepository: RestaurantRepository){

  }
  create(createRestaurant: CreateRestaurantDto): Restaurant {
    return this.restaurantRepository.create(createRestaurant);
  }

  findAll() {
    return this.restaurantRepository.findAll();
  }

  findOne(id: string): Restaurant {
    return this.restaurantRepository.findOne(id);
  }

  update(id: string, updateRestaurant: UpdateRestaurantDto) {
    return this.restaurantRepository.update(id, updateRestaurant);
  }

  remove(id: string) {
    return this.restaurantRepository.remove(id);
  }
}
