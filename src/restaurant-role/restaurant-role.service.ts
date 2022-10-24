import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRestaurantRoleDto } from './dto/create-restaurant-role.dto';
import { RestaurantRoleDto } from './dto/restaurant-role.dto';
import { RestaurantRole } from './entities/restaurant-role.entity';

@Injectable()
export class RestaurantRoleService {
  constructor(
    @InjectRepository(RestaurantRole)
    private repo: Repository<RestaurantRole>
  ) {}

  public async create(createRestaurantRole: CreateRestaurantRoleDto): Promise<RestaurantRoleDto> {
    const restaurantRole = this.repo.create(createRestaurantRole);
    const dbRestaurantRole = await this.repo.save(restaurantRole);
    return plainToInstance(RestaurantRoleDto, dbRestaurantRole);
  }

  public async findAll(): Promise<RestaurantRoleDto[]> {
    const restaurantRoles = await this.repo.find();
    return plainToInstance(RestaurantRoleDto, restaurantRoles);
  }

  private async findById(id: string): Promise<RestaurantRole> {
    const restaurantRole = await this.repo.findOneBy({
      id,
    });
    if (!restaurantRole) throw new NotFoundException();
    return restaurantRole;
  }

  public async findOne(id: string): Promise<RestaurantRoleDto> {
    const restaurantRole = await this.findById(id);
    return plainToInstance(RestaurantRoleDto, restaurantRole);
  }

  public async remove(id: string): Promise<void> {
    const restaurantRole = await this.findById(id);
    await this.repo.remove(restaurantRole);
  }
}
