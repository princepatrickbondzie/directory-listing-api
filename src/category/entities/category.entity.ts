import {
  Entity,
  Column,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Business } from '../../business/entities/business.entity';

@Entity({ name: 'e_categories' })
export class Category {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  description?: string;

  @Column({
    default: true,
    name: 'active',
  })
  active?: boolean;

  //relations
  @OneToMany((type) => Business, (business) => business.category)
  business?: Business[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
