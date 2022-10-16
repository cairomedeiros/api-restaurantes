import { RestaurantUpdatableInterface } from '../interfaces/restaurant-updatable.interface';

export class UpdateRestaurantDto implements RestaurantUpdatableInterface {
    name?: string;
    address?: string;
    openingHours?: string;
    active?: boolean;
}
