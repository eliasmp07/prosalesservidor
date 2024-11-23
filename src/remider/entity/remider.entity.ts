import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from 'src/customers/entity/customer.entity';
import { Opportunity } from 'src/oportunity/entity/oportunity.entity';

@Entity('reminders')
export class Reminder {
  @PrimaryGeneratedColumn()
  reminder_id: number;

  @ManyToOne(() => Customer, customer => customer.reminders)
  customer: Customer;

  @Column()
  typeAppointment: string;

  @Column({ type: 'bigint' })
  reminder_date: number;

  @Column()
  description: string;

  @Column({ default: false })
  is_completed: boolean;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
