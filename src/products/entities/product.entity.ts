import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Brand } from 'src/brands/entities/brands.entity';
import { ProductProductType } from 'src/product-type/entities/product-product-type/product-product-type';
@Entity('Products') //Table name
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: false })
  isOnSale: boolean;

  @Column()
  stock: number;

  @Column()
  img_url: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' }) // FK
  brand: Brand;

  @OneToMany(
    () => ProductProductType,
    (productProductType) => productProductType.product,
  )
  productProductTypes: ProductProductType[];
}
