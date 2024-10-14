import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Opportunity } from '../../oportunity/entity/oportunity.entity';
import { Interaction } from '../../interation/entity/interation.entity';
import { Purchase } from '../../purchase/entity/purchase.entity';
import { Reminder } from '../../remider/entity/remider.entity';
import { User } from 'src/users/user.entity';


@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  company_name: string;

  @Column()
  contact_name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @ManyToOne(() => User, user => user.customers)
  user: User;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'enum', enum: ['NUEVO', 'RECUPERACIÓN', 'DESARROLLO'] })
  type_of_client: string;

  @OneToMany(() => Opportunity, opportunity => opportunity.customer)
  opportunities: Opportunity[];

  @OneToMany(() => Interaction, interaction => interaction.customer)
  interactions: Interaction[];

  @OneToMany(() => Purchase, purchase => purchase.customer)
  purchases: Purchase[];

  @OneToMany(() => Reminder, reminder => reminder.customer)
  reminders: Reminder[];

  
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
