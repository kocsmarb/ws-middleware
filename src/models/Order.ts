import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import User from './User';
import OrderItem from './OrderItem';
import Shipment from './Shipment';

export enum OrderStatus {
  WAIT_FOR_CONFIRM,
  CONFIRMED,
  DELIVERING,
  DELIVERED,
}

@Entity()
export default class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.WAIT_FOR_CONFIRM,
  })
  status: OrderStatus;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @OneToMany(type => OrderItem, orderItem => orderItem.order)
  @JoinColumn()
  items: OrderItem[];

  @OneToOne(type => Shipment, shipment => shipment.order)
  @JoinColumn()
  shipment: Shipment;
}
