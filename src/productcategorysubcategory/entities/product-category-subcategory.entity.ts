import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Subcategory } from 'src/subcategories/entities/subcategories.entity';
import { Product } from 'src/products/entities/product.entity';
import { Category } from 'src/categories/entities/categories.entity';

@Entity('Product_category_subcategory') //Table name
export class ProductCategorySubcategory {
  @PrimaryColumn()
  product_id: number;

  @PrimaryColumn()
  category_id: number;

  @PrimaryColumn()
  subcategory_id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' }) //FK
  product: Product;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' }) //FK
  category: number;

  @ManyToOne(() => Subcategory)
  @JoinColumn({ name: 'subcategory_id' }) //FK
  subcategory: number;
}
