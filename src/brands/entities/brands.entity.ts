import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity('Brand') //Table name
export class Brand {
  @PrimaryGeneratedColumn()
  brand_id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
