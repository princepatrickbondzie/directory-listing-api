import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  BeforeUpdate,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'e_subscription' })
export class Subscription {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  price!: number;

  @Column()
  description?: string;

  //relations
  @OneToMany((type) => User, (user) => user.subscription)
  user?: User[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
