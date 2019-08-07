import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import Order from './Order';

@Entity()
export default class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  address: string;

  @Column('varchar', { length: 255, default: null })
  phone: string;

  @OneToOne(type => Order, order => order.shipment)
  order: Order;
}
