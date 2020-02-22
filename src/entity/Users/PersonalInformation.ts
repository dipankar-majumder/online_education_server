import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {User} from './User';

@Entity()
export class PersonalInformation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'date', nullable: true})
  dateOfBirth: string;

  @Column({type: 'varchar', length: 100, nullable: true})
  fatherName: string;

  @Column({type: 'varchar', length: 100, nullable: true})
  motherName: string;

  @Column({type: 'varchar', length: 100, nullable: true})
  guardianName: string;

  @Column({type: 'varchar', length: 30, nullable: true})
  relationWithGuardian: string;

  @Column({type: 'varchar', length: 20, nullable: true})
  gender: string;

  @Column({type: 'varchar', length: 100, nullable: true})
  occupation: string;

  @Column({type: 'varchar', length: 12, nullable: true})
  phone: string;

  @OneToOne(type => PersonalInformation)
  @JoinColumn()
  user: User;
}
