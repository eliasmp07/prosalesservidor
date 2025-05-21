import { Customer } from 'src/customers/entity/customer.entity';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Customer, (customer) => customer.conversation)
  @JoinColumn() // Necesario en el lado que poseerá la FK
  customer: Customer;

  @ManyToOne(() => User, { nullable: false,  eager: true  })
  ejecutivo: User; // ejecutivo asignado

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  admins: User[]; // administradores que pueden participar

  @OneToMany(() => Message, (message) => message.conversation, {
    cascade: true, eager: true 
  })
  messages: Message[];

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
