import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {User} from './User';

@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 100})
  addressLine: string;

  @Column({type: 'varchar', length: 6})
  pinCode: string;

  @Column({type: 'varchar', length: 50})
  state: string;

  @Column({type: 'varchar', length: 50})
  country: string;

  @Column({type: 'varchar', length: 60})
  city: string;

  @Column({type: 'varchar', length: 70})
  lankMark: string;

  @OneToOne(type => Address)
  @JoinColumn()
  user: User;
}
