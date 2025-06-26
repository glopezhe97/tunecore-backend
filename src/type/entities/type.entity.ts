import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Subcategory } from 'src/subcategories/entities/subcategories.entity';
@Entity('ProductType') //Table name
export class Type {
  @PrimaryColumn()
  productType_id: number;

  @Column()
  name: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.subcategory_id)
  @JoinColumn({ name: 'subcategory_id' }) //FK
  subcategory: Subcategory;

  @Column()
  subcategory_id: number; // columna FK
}
