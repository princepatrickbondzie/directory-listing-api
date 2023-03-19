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
import * as bcrypt from 'bcryptjs';
import { Roles } from '../../common/dto/app.enums';
import { Subscription } from '../../subscriptions/entities/subscription.entity';

@Entity({ name: 'e_users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  firstname!: string;

  @Column()
  lastname!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    name: 'contact',
    unique: true,
  })
  contact!: string;

  @Column()
  password!: string;

  @Column({
    default: Roles.User,
  })
  role!: Roles;

  @Column({
    default: true,
    name: 'active',
  })
  active?: boolean;

  @Column({
    default: false,
    name: 'emailactivated',
  })
  emailactivated?: boolean;

  //relations
  @OneToOne((type) => Subscription, (subscription) => subscription.user, {
    nullable: true,
  })
  subscription?: Subscription;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    await this.hashUserPassword();
  }

  @BeforeUpdate()
  async updatePasswordHash(): Promise<void> {
    if (this.password) {
      await this.hashUserPassword();
    }
  }

  private async hashUserPassword(): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }

  async isValidPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
