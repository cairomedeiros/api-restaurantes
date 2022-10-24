import { RestaurantInterface } from '../interfaces/restaurant.interface';

export class RestaurantDto implements RestaurantInterface {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userName: string;
  password: string;
  salt: string;
  name: string;
  openingHours: string;
  address: string;
  email: string;
  active: boolean;
}