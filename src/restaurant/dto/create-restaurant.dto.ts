import { IsString, IsEmail } from "class-validator";
import { RestaurantCreatableInterface } from "../interfaces/restaurant-creatable.interface";

export class CreateRestaurantDto implements RestaurantCreatableInterface {
    @IsString()
    userName!: string;

    @IsString()
    password!: string;

    @IsString()
    name!: string;

    @IsString()
    address!: string;

    @IsString()
    openingHours!: string;

    @IsString()
    @IsEmail()
    email!: string;
}
