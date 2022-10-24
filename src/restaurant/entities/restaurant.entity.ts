import { RestaurantInterface } from "../interfaces/restaurant.interface";


export class Restaurant implements RestaurantInterface{
    id: string;
    name: string;
    address: string;
    openingHours: string;
    userName: string;
    password: string;
    salt: string;
    email: string;
    active: true;
}
