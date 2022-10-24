import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantRoleController } from './restaurant-role.controller';
import { RestaurantRoleService } from './restaurant-role.service';

describe('RestaurantRoleController', () => {
  let controller: RestaurantRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantRoleController],
      providers: [RestaurantRoleService],
    }).compile();

    controller = module.get<RestaurantRoleController>(RestaurantRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
