import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly repo: Repository<Subscription>,
  ) {}

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const { name, price, description } = createSubscriptionDto;
    const sbs = await this.repo.findOne({ where: { name } });
    if (sbs) {
      throw new ConflictException('subscription is already registered');
    }

    const subscription = await this.repo.create({
      name: name,
      price: price,
      description: description,
    });

    return subscription;
  }

  async getSubscriptions(): Promise<Subscription[]> {
    return await this.repo.find();
  }

  async getUserSubscription(id: number, user: User): Promise<Subscription> {
    return await this.repo.findOne({
      relations: { user: true },
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });
  }

  async getOneSubscription(id: number): Promise<Subscription> {
    return await this.repo.findOne({
      relations: { user: true },
      where: { id },
    });
  }

  async updateSubscription(
    id: number,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    const { name, price, description } = updateSubscriptionDto;
    const subscription = await this.repo.findOne({ where: { id } });
    if (!subscription)
      throw new NotFoundException('subscription was not found');

    return await this.repo.update(
      { id },
      {
        name: name || subscription.name,
        price: price || subscription.price,
        description: description || subscription.description,
      },
    );
  }

  async removeSubscription(id: number): Promise<void> {
    const results = await this.repo.delete(id);
    if (results.affected === 0) {
      throw new NotFoundException('subscription was not found.');
    }
  }
}
