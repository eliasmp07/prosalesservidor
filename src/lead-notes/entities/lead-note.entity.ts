import { Customer } from 'src/customers/entity/customer.entity';
import { User } from 'src/users/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';

  @Entity('lead_notes')
  export class LeadNote {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('text')
    content: string;
  
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
  
    @ManyToOne(() => User, (user) => user.notes, { eager: true })
    author: User;
  
    @ManyToOne(() => Customer, (customer) => customer.notes, { onDelete: 'CASCADE' })
    customer: Customer;
  }
  