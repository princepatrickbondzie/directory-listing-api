import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Controller,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from '../auth/entities/user.entity';
import { Role } from '../common/helpers/methods';
import { Roles } from '../common/dto/app.enums';
import { RoleGuard } from '../guards/role.guard';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Controller('subscriptions')
@ApiTags('Subscription')
@ApiBearerAuth()
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @Role([Roles.SuperAdmin, Roles.Admin, Roles.CustomerSupport])
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'create subscription' })
  async createSubscription(
    @Body(ValidationPipe) createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    return await this.subscriptionsService.createSubscription(
      createSubscriptionDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'get all subscriptions' })
  async getSubscriptions(): Promise<Subscription[]> {
    return await this.subscriptionsService.getSubscriptions();
  }

  @Get('/user/:id')
  @ApiOperation({ summary: 'get a user subscription' })
  async getUserSubscription(
    @Request() request,
    @Param('id') id: number,
  ): Promise<Subscription> {
    const user: User = request.user;
    return await this.subscriptionsService.getUserSubscription(id, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'get one subscription' })
  async getOneSubscription(@Param('id') id: number): Promise<Subscription> {
    return await this.subscriptionsService.getOneSubscription(id);
  }

  @Patch(':id')
  @Role([Roles.SuperAdmin, Roles.Admin, Roles.CustomerSupport])
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'update subscription' })
  async updateSubscription(
    @Param('id') id: number,
    @Body(ValidationPipe) updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return await this.subscriptionsService.updateSubscription(
      id,
      updateSubscriptionDto,
    );
  }

  @Delete(':id')
  @Role([Roles.SuperAdmin, Roles.Admin, Roles.CustomerSupport])
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: 'delete subscription' })
  async removeSubscription(@Param('id') id: number): Promise<void> {
    return await this.subscriptionsService.removeSubscription(id);
  }
}
