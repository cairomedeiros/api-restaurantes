import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantRoleService } from './restaurant-role.service';

describe('RestaurantRoleService', () => {
  let service: RestaurantRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantRoleService],
    }).compile();

    service = module.get<RestaurantRoleService>(RestaurantRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
