// src/entities/line.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Line {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
  officer: string| undefined;

  @Column()
  lineCode: string| undefined;

  @Column()
  lineId: string| undefined; // store CSV as string
}
