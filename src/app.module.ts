import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SkuModule } from './sku/sku.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orm_config } from './orm.config';

@Module({
  imports: [UsersModule, SkuModule,TypeOrmModule.forRoot(orm_config)],
  controllers: [],
  providers: [],
})
export class AppModule {}
