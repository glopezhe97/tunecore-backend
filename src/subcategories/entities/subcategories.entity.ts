import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { Category } from 'src/categories/entities/categories.entity';
@Entity('Subcategory') //Table name
export class Subcategory {
  @PrimaryGeneratedColumn()
  subcategory_id: number;

  @Column()
  name: string;

  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn({ name: 'category_id' }) //FK
  category: Category;
}
