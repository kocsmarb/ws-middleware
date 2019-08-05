import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, default: '', nullable: true })
  firstName: string;

  @Column('varchar', { length: 255, default: '', nullable: true })
  lastName: string;

  @Column('varchar', { length: 255, nullable: true })
  phone: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column()
  password: string;
}
