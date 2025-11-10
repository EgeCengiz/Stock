import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';
import { Products } from 'src/products/products.entity';

export type StockAction = 'Ekle' | 'Çıkar';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Products, (product) => product.stocks, { eager: true })
  product: Products;

  @RelationId((stock: Stock) => stock.product)
  productId: number;

  @Column({ nullable: true })
  user: string;

  @Column({ type: 'enum', enum: ['Ekle', 'Çıkar', 'Güncelle'] })
  action: StockAction;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  beforeStock: number;

  @Column({ default: 0 })
  afterStock: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
