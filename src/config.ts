import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import User from './models/User';
import Product from './models/Product';
import Order from './models/Order';
import OrderItem from './models/OrderItem';
import Shipment from './models/Shipment';

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'developer',
  password: 'developer',
  database: 'developer',
  synchronize: true,
  logging: false,
  entities: [User, Product, Order, OrderItem, Shipment],
};

export { typeOrmConfig };
