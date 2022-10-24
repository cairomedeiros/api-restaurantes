import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfig } from './common/config/typeorm.config';

import { RestaurantModule } from './restaurant/restaurant.module';
import { RoleModule } from './role/role.module';
import { RestaurantRoleModule } from './restaurant-role/restaurant-role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [typeormConfig.KEY],
      useFactory: async (config: ConfigType<typeof typeormConfig>) => config,
    }),
    RestaurantModule,
    RoleModule,
    RestaurantRoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
