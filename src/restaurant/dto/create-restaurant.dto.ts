import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail } from "class-validator";
import { RestaurantCreatableInterface } from "../interfaces/restaurant-creatable.interface";

export class CreateRestaurantDto implements RestaurantCreatableInterface {
    @ApiProperty({
        type: 'string',
        description: 'username to access app',
    })
    @IsString()
    userName!: string;

    @ApiProperty({
        type: 'string',
        description: 'password to access app',
    })
    @IsString()
    password!: string;

    @ApiProperty({
        type: 'string',
        description: 'name to access app',
    })
    @IsString()
    name!: string;

    @ApiProperty({
        type: 'string',
        description: 'address',
    })
    @IsString()
    address!: string;

    @ApiProperty({
        type: 'string',
        description: 'opening hours',
    })
    @IsString()
    openingHours!: string;

    @ApiProperty({
        type: 'string',
        description: 'email to access app',
    })
    @IsString()
    @IsEmail()
    email!: string;
}
