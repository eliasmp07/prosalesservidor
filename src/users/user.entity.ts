import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Customer } from 'src/customers/entity/customer.entity';
import { Rol } from 'src/roles/rol.entity';
import { Sucursales } from 'src/sucursales/entities/sucursale.entity';
import { LeadNote } from 'src/lead-notes/entities/lead-note.entity';
import { CalendarEvent } from 'src/calendar-event/entities/calendar-event.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isDelete: boolean;

  @Column()
  puesto: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  image: string;

  @JoinTable({
    name: 'user_has_roles',
    joinColumn: {
      name: 'id_user',
    },
    inverseJoinColumn: {
      name: 'id_rol',
    },
  })
  @ManyToMany(() => Rol, (rol) => rol.users)
  roles: Rol[];

  @ManyToMany(() => Sucursales, (sucursal) => sucursal.usuarios)
  sucursales: Sucursales[];

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  // 🔁 Relación con las notas tipo chat
  @OneToMany(() => LeadNote, (note) => note.author)
  notes: LeadNote[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, Number(process.env.HAST_SALT));
  }
  @OneToMany(() => Customer, (customer) => customer.user)
  customers: Customer[];

  @Column()
  refreshToken: string;

  @OneToMany(() => CalendarEvent, (activity) => activity.createdBy)
  events: CalendarEvent[];

  @ManyToMany(() => CalendarEvent, (event) => event.participants)
  participatingEvents: CalendarEvent[];
}
