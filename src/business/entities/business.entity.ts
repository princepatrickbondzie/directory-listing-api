import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity({ name: 'e_business' })
export class Business {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  contact!: string;

  @Column()
  description!: string;

  @Column()
  location!: string;

  //relations
  @ManyToOne((type) => Category, (category) => category.business)
  category?: Category;
}
