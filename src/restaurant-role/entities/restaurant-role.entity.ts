import { Entity, Column, Unique, ManyToOne } from 'typeorm';
import { RestaurantRoleInterface } from '../interfaces';
import { CommonEntity } from '../../common/common.entity';
import { Role } from '../../role/entities/role.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@Entity()
@Unique(['restaurantId', 'roleId'])
export class RestaurantRole extends CommonEntity implements RestaurantRoleInterface {
  @Column()
  restaurantId!: string;

  @Column()
  roleId!: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.restaurantRoles)
  restaurant!: Restaurant;

  @ManyToOne(() => Role, role => role.restaurantRoles)
  role!: Role;
}