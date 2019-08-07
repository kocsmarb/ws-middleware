import { getRepository, getConnection } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Product from '../models/Product';
import Order from '../models/Order';
import Shipment from '../models/Shipment';
import OrderItem from '../models/OrderItem';

const createResolvers = () => {
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);
  const orderRepository = getRepository(Order);

  return {
    Query: {
      users: async () => await userRepository.find(),
      user: async (_, { id }) => await userRepository.findOne(id),
      products: () => productRepository.find(),
      product: (_, { id }) => productRepository.findOne(id),
      productsByCategory: (_, { category }) =>
        productRepository.find({ where: { category }, order: { name: 'ASC' } }),
      orders: () => orderRepository.find({ relations: ['user'] }),
      userOrders: (_, { userId }) =>
        orderRepository.find({ relations: ['user'], where: { user: { id: userId } } }),
      me: (parent, args, { currentUser }) => {
        // this if statement is our authentication check
        if (!currentUser) {
          throw new Error('Not Authenticated');
        }
        return userRepository.findOne(currentUser.id);
      },
      categories: async () => {
        const cat = await productRepository
          .createQueryBuilder('user')
          .select('user.category', 'cat')
          .groupBy('user.category')
          .orderBy('user.category', 'ASC')
          .execute();
        return cat.map(i => i.cat);
      },
    },
    Mutation: {
      register: async (parent, { email, password }, ctx, info) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User();
        user.email = email;
        user.password = hashedPassword;
        try {
          await userRepository.save(user);
          return user;
        } catch (e) {
          throw new Error('This e-mail is already exists.');
        }
      },
      login: async (parent, { email, password }, ctx, info) => {
        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
          throw new Error('Invalid Login: missing user');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new Error('Invalid Login: wrong password');
        }

        const token = jwt.sign(
          {
            id: user.id,
            username: user.email,
            fingerprint: ctx.getFingetprint(),
          },
          process.env.JWT_PRIVATE_KEY,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          },
        );
        return {
          token,
          user,
        };
      },
      createOrder: async (parent, { input }, ctx, info) => {
        const user = await userRepository.findOne(input.userId);
        user.firstName = input.firstName;
        user.lastName = input.lastName;
        const order = new Order();
        order.user = user;
        order.shipment = new Shipment();
        order.shipment.address = input.address;
        order.shipment.phone = input.phone;
        order.items = await Promise.all(
          input.items.map(async item => {
            const orderItem = new OrderItem();
            orderItem.price = item.price;
            orderItem.quantity = item.quantity;
            orderItem.product = await productRepository.findOne(input.productId);
            await getConnection().manager.save(orderItem);
            return orderItem;
          }),
        );
        await getConnection().manager.save(user);
        await getConnection().manager.save(order.shipment);
        await getConnection().manager.save(order);
        return order;
      },
    },
  };
};

export { createResolvers };
