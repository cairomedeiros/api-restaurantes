import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantRepository } from './restaurant.repository';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/restaurant.entity';

describe(RestaurantService, () => {
  let service: RestaurantService;
  let repository: RestaurantRepository;
  const defaultRestaurantDto: Restaurant = {
    name: 'default',
    userName: 'default',
    password: 'default',
    salt: 'default',
    openingHours: 'default',
    address: 'default',
    email: 'default',
    id: 'id',
    active: true
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantService, RestaurantRepository],
    }).compile();

    service = module.get<RestaurantService>(RestaurantService);
    repository = module.get<RestaurantRepository>(RestaurantRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe(RestaurantService.prototype.create, () => {
    it('should success', () => {
      const restaurant = service.create(defaultRestaurantDto);

      expect(restaurant.id).toBeDefined();
      expect(restaurant.name).toBe(defaultRestaurantDto.name);
      expect(restaurant.userName).toBe(defaultRestaurantDto.userName);
      expect(restaurant.email).toBe(defaultRestaurantDto.email);
      expect(restaurant.password).toBe(defaultRestaurantDto.password);
      expect(restaurant.address).toBe(defaultRestaurantDto.address);
      expect(restaurant.openingHours).toBe(defaultRestaurantDto.openingHours);
    });
  });
});
