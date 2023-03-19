import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { AppsModule } from './apps/apps.module';
import { dataSourceOptions } from './db/datasource';
// import { UploadModule } from './upload/upload.module';
import { CategoryModule } from './category/category.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    AppsModule,
    BusinessModule,
    CategoryModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
