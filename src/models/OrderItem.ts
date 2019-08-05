import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Order from './Order';
import Product from './Product';

@Entity()
export default class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { width: 8 })
  price: number;

  @Column('int', { width: 4 })
  quantity: number;

  @ManyToOne(type => Order, order => order.items)
  @JoinColumn()
  order: Order;

  @ManyToOne(type => Product, product => product.id)
  @JoinColumn()
  product: Product;
}
