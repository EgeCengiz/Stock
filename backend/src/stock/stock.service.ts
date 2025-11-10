import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';
import { StockDto } from './dto/stock.dto';
import { Products } from 'src/products/products.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,

    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async stockIn(dto: StockDto, user: string): Promise<Stock> {
    const lastStock = await this.stockRepository.findOne({
      where: { productId: dto.productId },
      order: { createdAt: 'DESC' },
    });

    const beforeStock = lastStock ? lastStock.afterStock : 0;
    const afterStock = beforeStock + dto.quantity;

    const product = await this.productsRepository.findOne({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product bulunamadı');

    const newStock = this.stockRepository.create({
      ...dto,
      product,
      action: 'Ekle',
      beforeStock,
      afterStock,
      user: user || 'SYSTEM',
    });

    return this.stockRepository.save(newStock);
  }

  async stockOut(dto: StockDto, user: string): Promise<Stock> {
    const lastStock = await this.stockRepository.findOne({
      where: { productId: dto.productId },
      order: { createdAt: 'DESC' },
    });

    if (!lastStock) throw new NotFoundException('Stok bulunamadı');

    const beforeStock = lastStock.afterStock;
    const afterStock = beforeStock - dto.quantity;

    if (afterStock < 0) throw new BadRequestException('Yetersiz stok');

    const product = await this.productsRepository.findOne({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product bulunamadı');

    const newStock = this.stockRepository.create({
      ...dto,
      product,
      action: 'Çıkar',
      beforeStock,
      afterStock,
      user: user || 'SYSTEM',
    });

    return this.stockRepository.save(newStock);
  }

  async getStockMovements(): Promise<Stock[]> {
    return this.stockRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['product'],
    });
  }
}
