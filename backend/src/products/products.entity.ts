import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Stock } from 'src/stock/stock.entity';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productCode: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ default: 0 })
  minStock: number;

  @Column({ default: 0 })
  currentStock: number;

  @OneToMany(() => Stock, (stock) => stock.product)
  stocks: Stock[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
