import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Officer {
  @PrimaryGeneratedColumn()
  id!: number;  // Auto-generated primary key

  @Column()
  name!: string;

  @Column({ unique: true })
  nic!: string;  // National ID, unique

  @Column()
  joinedDate!: Date;
}
