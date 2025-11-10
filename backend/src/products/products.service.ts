import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/products.dto';
import { Stock } from 'src/stock/stock.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,

    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async postProducts(dto: ProductDto, userId: string): Promise<Products> {
    const product = await this.productsRepository.save(dto);

    const stock = this.stockRepository.create({
      product: product,
      quantity: product.currentStock || 0,
      beforeStock: 0,
      afterStock: product.currentStock || 0,
      user: userId,
      action: 'Ekle',
      description: 'Yeni Ürün Eklendi',
    });

    await this.stockRepository.save(stock);

    return product;
  }

  async getProducts(): Promise<Products[]> {
    return this.productsRepository.find({ relations: ['stocks'] });
  }

  async getProductsId(id: number): Promise<Products> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['stocks'],
    });
    if (!product) throw new NotFoundException(`Product not found: ${id}`);
    return product;
  }

  async putProducts(id: number, dto: ProductDto): Promise<Products> {
    const existingProduct = await this.productsRepository.findOne({
      where: { id },
    });

    if (!existingProduct)
      throw new NotFoundException(`Product not found: ${id}`);

    const beforeStock = existingProduct.currentStock || 0;

    Object.assign(existingProduct, dto);

    const updatedProduct = await this.productsRepository.save(existingProduct);

    const afterStock = dto.currentStock ?? beforeStock;
    const stock = this.stockRepository.create({
      product: updatedProduct,
      quantity: afterStock - beforeStock,
      beforeStock,
      afterStock,
      user: '5',
      action: 'Ekle',
      description: 'Ürün Güncellendi',
    });

    await this.stockRepository.save(stock);

    return updatedProduct;
  }

  async deleteProducts(id: number): Promise<boolean> {
    const result = await this.productsRepository.delete(id);
    if (!result.affected)
      throw new NotFoundException(`Product not found: ${id}`);

    return result.affected > 0;
  }
}
