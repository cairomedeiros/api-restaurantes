import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRoleService } from './restaurant-role.service';
import { RestaurantRoleController } from './restaurant-role.controller';
import { RestaurantRole } from './entities/restaurant-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantRole])],
  controllers: [RestaurantRoleController],
  providers: [RestaurantRoleService]
})
export class RestaurantRoleModule {}
