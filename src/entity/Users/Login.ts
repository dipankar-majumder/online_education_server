import {
  Entity,
  Column,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {User} from './User';

@Entity()
export class Login {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 30, nullable: false, unique: true})
  userName: string;

  @Column({type: 'varchar', length: 256, nullable: false})
  password: string;

  @Column({type: 'varchar', length: 20, nullable: false})
  type: string;

  @Column({type: 'varchar', length: 300, nullable: false})
  refreshToken: string;

  @Column({type: 'boolean', nullable: false, default: false})
  active: boolean;

  @OneToOne(type => Login)
  @JoinColumn()
  user: User;
}
