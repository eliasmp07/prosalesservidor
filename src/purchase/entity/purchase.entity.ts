import { Customer } from 'src/customers/entity/customer.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  purchase_id: number;

  @ManyToOne(() => Customer, customer => customer.purchases)
  customer: Customer;

  @Column()
  product_service_name: string;

  @Column()
  purchase_date: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;
}
