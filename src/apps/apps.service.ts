import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { App } from './entities/app.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(App) private readonly appRepository: Repository<App>,
  ) {}

  async createThirdPartyApp(createAppDto: CreateAppDto): Promise<App> {
    try {
      const { name, supportEmail } = createAppDto;
      const app = new App();
      app.supportMail = supportEmail;
      app.name = name;
      app.apiKey = uuidv4();

      return await app.save();
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('app name is aleady taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async getApps(): Promise<App[]> {
    return await this.appRepository.find();
  }

  // Toggle activation/deactivation of app
  async toggleApp(id: number): Promise<void> {
    const app = await this.appRepository.findOne({ where: { id } });
    if (!app) {
      throw new BadRequestException();
    }
    app.active = !app.active;
    await app.save();
  }

  async getOneApp(id: number): Promise<App> {
    const app = await this.appRepository.findOne({ where: { id } });
    if (!app) {
      throw new BadRequestException();
    }
    return app;
  }

  async updateApp(id: number, updateAppDto: UpdateAppDto): Promise<App> {
    const app = await this.appRepository.findOne({ where: { id } });
    if (!app) {
      throw new BadRequestException();
    }

    Object.keys(updateAppDto).map((key) => {
      app[key] = updateAppDto[key];
    });

    return await app.save();
  }

  // remove(id: number) {
  //   return `This action removes a #${id} app`;
  // }
}
