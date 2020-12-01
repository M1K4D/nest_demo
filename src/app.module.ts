import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SkuModule } from './sku/sku.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { orm_config } from './orm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, SkuModule,TypeOrmModule.forRoot(orm_config), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
