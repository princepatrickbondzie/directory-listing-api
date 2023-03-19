import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({name: 'e_apps'})
export class App extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  apiKey: string;

  @Column({
    default: true,
  })
  active: boolean;

  @Column()
  supportMail: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
