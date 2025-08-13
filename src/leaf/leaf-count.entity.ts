import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  Index,
} from 'typeorm';

@Unique(['lineCode', 'month', 'year'])
@Entity()
export class LeafCount {
  @PrimaryGeneratedColumn()
id!: number;

@Column()
year!: number;

@Column()
month!: number;

@Column()
lineCode!: string;

@Column('decimal', { precision: 5, scale: 2, default: 0 })
B!: number;

@Column('decimal', { precision: 5, scale: 2, default: 0 })
BB!: number;

@Column('decimal', { precision: 5, scale: 2, default: 0 })
P!: number;

}
