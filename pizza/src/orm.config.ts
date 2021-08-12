/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Users } from './users/user.entity';
import { Orders } from 'src/order/order.entity';
import { Pizza } from './pizza/pizza.entity';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Your_password_here',
    database: 'nest_pizza',
    entities: [Users, Pizza, Orders],
    synchronize: true,
};
