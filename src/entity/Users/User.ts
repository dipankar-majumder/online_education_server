import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar', length: 100})
  name: string;

  @Column({type: 'varchar', length: 70, unique: true})
  email: string;

  @Column({type: 'timestamp', default: () => 'LOCALTIMESTAMP'})
  joiningDate: string;
}
