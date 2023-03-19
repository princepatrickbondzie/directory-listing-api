import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from '../apps/entities/app.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(App) private readonly appRepository: Repository<App>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const appToken = request.headers['x-authorization'];
    if (!appToken) {
      return false;
    }
    const app = await this.appRepository.findOne({
      where: { apiKey: appToken },
    });
    if (!app) {
      return false;
    }
    request.app = app;
    return app.active === true && app.apiKey === appToken;
  }
}
