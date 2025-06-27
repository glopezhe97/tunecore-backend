import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subcategory } from 'src/subcategories/entities/subcategories.entity';
import { ProductProductType } from 'src/product-type/entities/product-product-type/product-product-type';
@Entity('ProductType') //Table name
export class Type {
  @PrimaryGeneratedColumn()
  productType_id: number;

  @Column()
  name: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.subcategory_id)
  @JoinColumn({ name: 'subcategory_id' }) //FK
  subcategory: Subcategory;

  @Column()
  subcategory_id: number; // columna FK

  @OneToMany(
    () => ProductProductType,
    (productProductType) => productProductType.type,
  )
  productProductType: ProductProductType[];
}
