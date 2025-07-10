import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { Category } from 'src/categories/entities/categories.entity';
import { Type } from 'src/type/entities/type.entity';
@Entity('Subcategory') //Table name
export class Subcategory {
  @PrimaryGeneratedColumn()
  subcategory_id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn({ name: 'category_id' }) //FK
  category: Category;

  @OneToMany(() => Type, (productType) => productType.subcategory)
  productTypes: Type[];
}
