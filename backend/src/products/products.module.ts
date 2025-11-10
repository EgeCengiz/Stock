import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Stock } from 'src/stock/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Stock])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
