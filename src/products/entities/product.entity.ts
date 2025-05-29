import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  brand_id: number;
}
