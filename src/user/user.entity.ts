import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', unique: true })
  username!: string;

  @Column({ type: 'text' })
  password!: string;

  @Column({ type: 'text', default: 'user' }) // 'user' | 'admin' | 'super'
  role!: string;

  @Column({ type: 'boolean', default: false })
  status!: boolean; // true = active, false = deactivated
}
