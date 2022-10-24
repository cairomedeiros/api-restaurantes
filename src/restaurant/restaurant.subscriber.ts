import {
    EntitySubscriberInterface,
    Equal,
    EventSubscriber,
    InsertEvent,
    Not,
    UpdateEvent,
  } from 'typeorm';
  import { FindOperator } from 'typeorm/find-options/FindOperator';
  
  import { BadRequestException } from '@nestjs/common';
  
  import { CryptUtil } from '../common/utils/crypt.util';
  //import { UserRole } from '../user-role/user-role.entity';
  //import { Role } from '../role/role.entity';
  //import { AppRole } from '../../app.acl';
  import { Restaurant } from './entities/restaurant.entity';
  
  @EventSubscriber()
  export class RestaurantSubscriber implements EntitySubscriberInterface<Restaurant> {
    listenTo() {
      return Restaurant;
    }
  
    async beforeInsert(event: InsertEvent<Restaurant>) {
      await this._checkEmailUniqueness(event);
      await this._hashInsertedPassword(event);
    }
  
    // async afterInsert(event: InsertEvent<User>) {
    //   //await this._assignDefaultUserRole(event);
    // }
  
    async beforeUpdate(event: UpdateEvent<Restaurant>) {
      await this._checkEmailUniqueness(event);
      await this._hashUpdatedPassword(event);
    }
  
    async _hashPassword(restaurant: Restaurant) {
      // yes, new salt and hash it
      restaurant.salt = await CryptUtil.generateSalt();
      restaurant.password = await CryptUtil.hashPassword(restaurant.password, restaurant.salt);
    }
  
    async _hashInsertedPassword(event: InsertEvent<Restaurant>) {
      // user being inserted
      const restaurant = event.entity;
  
      // hash the password
      await this._hashPassword(restaurant);
  
      // all done
      return;
    }
  
    async _hashUpdatedPassword(event: UpdateEvent<Restaurant>) {
      // user being updated
      const restaurant = event.entity as Restaurant;
  
      // get existing record
      const currentRecord = await event.manager.findOne(Restaurant, {
        where: {
          id: restaurant.id,
        },
      });
  
      // has it changed?
      if (
        currentRecord?.password &&
        restaurant?.password &&
        restaurant.password !== currentRecord.password
      ) {
        // yes, hash the password
        await this._hashPassword(restaurant);
      }
  
      // all done
      return;
    }
  
    async _checkEmailUniqueness(event: InsertEvent<Restaurant> | UpdateEvent<Restaurant>) {
      // user being inserted
      const restaurant = event.entity;
  
      // does user have email set?
      if (restaurant?.email) {
        // build the criteria
        const criteria: {
          where: {
            id?: FindOperator<string>;
            email: FindOperator<string>;
          };
        } = {
          where: {
            email: Equal(restaurant.email),
          },
        };
        // if user exists, skip own id
        if (restaurant.id) {
          criteria.where.id = Not(restaurant.id);
        }
        // query for count of users with exact e-mail address
        const count = await event.manager.count(Restaurant, criteria);
        // if any found, a foreign key violation would occur
        if (count > 0) {
          throw new BadRequestException('Email address already exists.');
        } else {
          return;
        }
      } else {
        return;
      }
    }
  
    //   async _assignDefaultUserRole(event: InsertEvent<User>) {
    //     // get the user that was inserted
    //     const user = event.entity;
  
    //     // already has roles?
    //     if (Array.isArray(user.userRoles) && user.userRoles.length) {
    //       // yes, leave roles alone
    //       return;
    //     }
  
    //     // find the role
    //     const defaultUserRole = await event.manager.findOne<Role>(Role, {
    //       name: AppRole.User,
    //     });
  
    //     // did we get the role?
    //     if (defaultUserRole) {
    //       // assign the role to the user
    //       const userRole = event.manager.create<UserRole>(UserRole, {
    //         user,
    //         role: defaultUserRole,
    //       });
    //       // save it
    //       await event.manager.save(userRole);
    //     } else {
    //       throw new InternalServerErrorException(
    //         'Failed to find default role to assign to new user.'
    //       );
    //     }
    //   }
  }