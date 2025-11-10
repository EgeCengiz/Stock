import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { Stock } from './stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/products/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Products])],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
