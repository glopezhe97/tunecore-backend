import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Subcategory } from './subcategory.entity';
import { Product } from './product.entity';
import { Category } from './category.entity';

@Entity('Product_category_subcategory') //Table name
export class ProductCategorySubcategory {
  @PrimaryColumn()
  product_id: Product;

  @PrimaryColumn()
  category_id: number;

  @PrimaryColumn()
  subcategory_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' }) //FK
  product: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' }) //FK
  category: number;

  @ManyToOne(() => Subcategory)
  @JoinColumn({ name: 'subcategory_id' }) //FK
  subcategory: number;
}
