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

  @OneToOne(() => Customer, (customer) => customer.conversations)
  @JoinColumn()
  customer: Customer;

  @ManyToOne(() => User, { nullable: false, eager: true })
  ejecutivo: User; // Ejecutivo asignado al cliente

  @ManyToOne(() => User, { nullable: false, eager: true })
  creator: User; // El que inicia la conversación (puede ser gerente o ejecutivo)

  @ManyToOne(() => User, { nullable: false, eager: true })
  participant: User; // El otro usuario (gerente o ejecutivo, depende del caso)

  @OneToMany(() => Message, (message) => message.conversation, {
    cascade: true,
    eager: true,
  })
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;
}

