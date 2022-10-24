import { CommonEntity } from '../../common/common.entity';
import { Column, Entity, OneToMany, ManyToMany, Unique } from 'typeorm';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { RestaurantRole } from 'src/restaurant-role/entities/restaurant-role.entity';

@Entity()
@Unique(['name'])
export class Role extends CommonEntity {
  @Column()
  name!: string;

  @OneToMany(() => RestaurantRole, restaurantRole => restaurantRole.role)
  restaurantRoles!: RestaurantRole[];

  //TODO: One way to do ManyToMany relationship
  //@ManyToMany(() => Restaurant, (restaurant) => restaurant.roles)
  //restaurant!: Restaurant[];
}
