import { Module } from '@nestjs/common';
import { Config } from '../config/config';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Subscription } from '../subscriptions/entities/subscription.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Config.JWT_SECRET,
      signOptions: {
        expiresIn: Config.JWT_EXPIRES_IN,
      },
    }),
    TypeOrmModule.forFeature([User, Subscription]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
