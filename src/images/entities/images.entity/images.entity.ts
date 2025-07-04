import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
@Entity('Images') //Table name
export class Images {
  @PrimaryGeneratedColumn()
  image_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  route: string;

  @Column()
  disposition: number;
}
