import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import {User} from './User';

@Entity()
export class EducationalQualification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'date', nullable: true})
  startingDate: string;

  @Column({type: 'date', nullable: true})
  endingDate: string;

  @Column({type: 'varchar', length: 100, nullable: false})
  courseName: string;

  @Column({type: 'varchar', length: 100, nullable: true})
  institutionName: string;

  @Column({type: 'varchar', length: 100, nullable: true})
  institutionLocation: string;

  @Column({type: 'varchar', length: 10, nullable: true})
  grade: string;

  @OneToOne(type => EducationalQualification)
  @JoinColumn()
  user: User;
}
