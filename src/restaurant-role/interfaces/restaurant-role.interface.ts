import { CommonEntityInterface } from '../../common/interfaces/common-entity.interface';

export interface RestaurantRoleInterface extends CommonEntityInterface {
  restaurantId: string;
  roleId: string;
}