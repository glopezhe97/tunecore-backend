import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Subcategory } from 'src/subcategories/entities/subcategories.entity';
@Entity('Category') //Table name
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];
}
