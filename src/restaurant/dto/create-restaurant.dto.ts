import { RestaurantCreatableInterface } from "../interfaces/restaurant-creatable.interface";

export class CreateRestaurantDto implements RestaurantCreatableInterface {
    userName!: string;
    password!: string;
    name!: string;
    email!: string;
}
