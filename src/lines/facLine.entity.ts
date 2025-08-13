import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['lineCode', 'lineId'])
export class FacLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  lineCode!: string;

  @Column()
  lineId!: string;

  @Column()
  officer!: string;

@Column({ nullable: true })
startedDate!: Date;

}
