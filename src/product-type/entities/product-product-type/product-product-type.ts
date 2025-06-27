import { Product } from 'src/products/entities/product.entity';
import { Type } from 'src/type/entities/type.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('Product_productType') //Table name
export class ProductProductType {
  @PrimaryColumn()
  product_id: number;

  @PrimaryColumn()
  productType_id: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Type, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productType_id' })
  type: Type;
}
