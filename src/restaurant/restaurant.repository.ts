import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantRepository {

  public restaurants: Restaurant[];

  constructor(){
    this.restaurants = [];
  }

  private convertToRestaurant(createRestaurant: CreateRestaurantDto): Restaurant {
    const restaurant = new Restaurant;

    restaurant.name = createRestaurant.name;
    restaurant.userName = createRestaurant.userName;
    restaurant.email = createRestaurant.email;
    restaurant.password = createRestaurant.password;
    restaurant.address = createRestaurant.password;
    restaurant.openingHours = createRestaurant.openingHours;
    restaurant.active = true;

    return restaurant;
  }

  create(createRestaurant: CreateRestaurantDto): Restaurant {
    const restaurant = this.convertToRestaurant(createRestaurant);
    restaurant.id = randomUUID();
    this.restaurants.push(restaurant);
    return restaurant;
  }

  findAll() {
    return this.restaurants;
  }

  findOne(id: string): Restaurant {
    const restaurant = this.restaurants.find((restaurant) => restaurant.id === id);
    if (!restaurant) throw new NotFoundException();
    return restaurant;
  }

  update(id: string, updateRestaurant: UpdateRestaurantDto) {
    const restaurant = this.findOne(id);
    if (updateRestaurant.name) restaurant.name = updateRestaurant.name;
    if (updateRestaurant.openingHours) restaurant.openingHours = updateRestaurant.openingHours;
    if (updateRestaurant.address) restaurant.address = updateRestaurant.address;
    return restaurant;
  }

  remove(id: string) {
    const index = this.restaurants.findIndex((prop) => prop.id === id);
    if (index < 0) throw new NotFoundException();
    this.restaurants.splice(index, 1);
  }
}
