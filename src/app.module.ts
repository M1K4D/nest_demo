import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SkuModule } from './sku/sku.module';

@Module({
  imports: [UsersModule, SkuModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
