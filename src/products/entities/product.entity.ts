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
import { Images } from 'src/images/entities/images.entity/images.entity';
@Entity('Products') //Table name
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: false })
  featured: boolean;

  @Column({ default: false })
  isOnSale: boolean;

  @Column()
  stock: number;

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

  @OneToMany(() => Images, (image) => image.product)
  images: Images;
}
