import { Customer } from "src/customers/entity/customer.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointment')
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    estado: string;

    @Column()
    fecha: number;

    @Column()
    duracion: number;

    @Column({nullable : true})
    lugar?: string;

    @Column()
    tipo: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
