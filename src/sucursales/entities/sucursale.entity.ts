
import { User } from 'src/users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity({name: 'sucursales'})
export class Sucursales {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({ nullable: true })
    image: string;

    @Column()
    direccion: string;

    @ManyToMany(() => User, (user) => user.sucursales)
    @JoinTable({
    name: 'usuarios_sucursales', // Nombre de la tabla intermedia
    joinColumn: { name: 'sucursal_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
    })
    usuarios: User[];

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
