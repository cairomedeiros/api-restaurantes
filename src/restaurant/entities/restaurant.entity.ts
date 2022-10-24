import { CommonEntity } from "src/common/common.entity";
import { RestaurantRole } from "src/restaurant-role/entities/restaurant-role.entity";
import { Role } from "src/role/entities/Role.entity";
import { Column, Entity, Unique, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { RestaurantInterface } from "../interfaces/restaurant.interface";

@Entity()
@Unique(['userName'])
@Unique(['email'])
export class Restaurant extends CommonEntity implements RestaurantInterface{

    @Column({ type: 'citext', nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    address: string;

    @Column({ type: 'text', nullable: false })
    openingHours: string;

    @Column({ type: 'citext', nullable: false })
    userName: string;

    @Column({ type: 'text', nullable: false })
    password: string;

    @Column({ type: 'text', nullable: false, default: true })
    salt: string;

    @Column({ type: 'citext', nullable: false })
    email: string;

    @Column({ default: true, nullable: false })
    active: boolean;

    @OneToMany(() => RestaurantRole, restaurantRole => restaurantRole.role)
    restaurantRoles!: RestaurantRole[];
}
