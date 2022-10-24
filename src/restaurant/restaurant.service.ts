import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { plainToInstance } from 'class-transformer';
import { RestaurantDto } from './dto/restaurant.dto';


@Injectable()
export class RestaurantService {

  constructor(
    @InjectRepository(Restaurant)
    private repo: Repository<Restaurant>
  ){}

  public async create(createRestaurant: CreateRestaurantDto): Promise<RestaurantDto> {
    try{
      const restaurant = this.repo.create(createRestaurant);
      const dbRestaurant = await this.repo.save(restaurant);
      return plainToInstance(RestaurantDto, dbRestaurant);
    }catch(e){
      throw new InternalServerErrorException('Error trying to create a user')
    }
  }
  public async findAll(): Promise<RestaurantDto[]> {
    const restaurants = await this.repo.find({
      relations: ['restaurantRoles'],
    });
    return plainToInstance(RestaurantDto, restaurants);
  }

  private async findById(id: string): Promise<Restaurant> {
    // Get without relationships
    const restaurant = await this.repo.findOneBy({
      id,
    });
    // const user = await this.repo.findOne({
    //   where: { id },
    //   relations: ['roles'],
    // });
    if (!restaurant) throw new NotFoundException();
    return restaurant;
  }

  public async findOne(id: string): Promise<RestaurantDto> {
    const restaurant = await this.findById(id);
    return plainToInstance(RestaurantDto, restaurant);
  }

  public async update(
    id: string,
    updateRestaurant: UpdateRestaurantDto
  ): Promise<RestaurantDto> {
    const restaurant = await this.findById(id);
    const newRestaurant: Restaurant = {
      ...restaurant,
      ...updateRestaurant,
    };
    this.repo.save(newRestaurant);
    return plainToInstance(RestaurantDto, newRestaurant);
  }

  public async remove(id: string): Promise<void> {
    const restaurant = await this.findById(id);
    await this.repo.remove(restaurant);
  }
}
