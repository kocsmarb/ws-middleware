import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 120 })
  @Index()
  category: string;

  @Column('varchar', { length: 255, default: '', nullable: true })
  description: string;

  @Column('varchar', { length: 120 })
  name: string;

  @Column('int', { width: 8 })
  price: number;

  @Column('smallint', { width: 1, default: null })
  spicy: boolean;

  @Column('smallint', { width: 1, default: null })
  vegetarian: boolean;
}
