import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { Roles } from '../common/dto/app.enums';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserAuthGuard extends AuthGuard('jwt') {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    try {
      const request = context.switchToHttp().getRequest();
      let accessToken = request.headers['authorization'];
      accessToken = accessToken.split(' ')[1];

      const decodeToken = this.jwtService.verify(accessToken);
      const { email } = decodeToken;
      let user = await this.getUser(email);

      if (!this.isUserValid(user)) {
        return false;
      }

      request.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private isUserValid(user: User): boolean {
    // only users can use access tokens
    if (user && !(user.role === Roles.User)) {
      return false;
    }

    return true;
  }

  private async getUser(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
