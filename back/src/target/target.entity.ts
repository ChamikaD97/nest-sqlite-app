import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['lineCode', 'month', 'year'], { unique: true })
export class Target {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  lineCode!: string;

  @Column('integer')
  target!: number;

  @Column('integer')
  month!: number;

  @Column('integer')
  year!: number;
}
