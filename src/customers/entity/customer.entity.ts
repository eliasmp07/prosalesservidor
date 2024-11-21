import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, AfterLoad, BeforeInsert } from 'typeorm';
import { Opportunity } from '../../oportunity/entity/oportunity.entity';
import { Interaction } from '../../interation/entity/interation.entity';
import { Purchase } from '../../purchase/entity/purchase.entity';
import { Reminder } from '../../remider/entity/remider.entity';
import { User } from 'src/users/user.entity';
import { Project } from 'src/projects/entities/project.entity';

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

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  progressLead: number;

  @ManyToOne(() => User, user => user.customers,{ eager: true })
  user: User;

  @OneToMany(() => Project, project => project.customer, { eager: true })
  projects: Project[];

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

  /**
   * Método explícito para calcular el progreso.
   */
  calculateProgress(userId: number) {
    if (userId == this.user.id) {
      let progress = 10.0;
  
      if (this.interactions && this.interactions.length > 0) {
        progress += 15.0;
      }
  
      if (this.purchases && this.purchases.length > 0) {
        progress += 15.0;
      }
  
      if (this.projects && this.projects.length > 0) {
        progress += 20.0;
  
        let hasCierre = false;
        let allPerdido = true;
  
        this.projects.forEach((project) => {
          if (project.status === 'Cierre') {
            hasCierre = true;
          } else if (project.status !== 'Perdido') {
            allPerdido = false;
          }
        });
  
        if (hasCierre) {
          progress = 100.0; // Si al menos un proyecto tiene "Cierre", la suma es 100.
        } else if (allPerdido) {
          progress = 40.0; // Si todos tienen "Perdido", la suma es 40.
        } else {
          // Cálculo original si no aplica ninguna de las reglas anteriores.
          this.projects.forEach((project) => {
            if (project.status === 'En negociacion') {
              progress = 90;
            } 
          });
        }
      }
  
      this.progressLead = Math.min(progress, 100.0); // Asegurarse de que no supere 100.
    }
  }
  
}
