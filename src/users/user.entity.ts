import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import { hash } from 'bcrypt';
import { Customer } from "src/customers/entity/customer.entity";

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
    
    @Column({nullable: true})
    phone: string;
    
    @Column({ nullable: true })
    image: string;

    @Column({ default: false }) // Aquí se agrega el campo isAdmin con default false
    isAdmin: boolean;
    
    @Column()
    password: string;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @BeforeInsert()
    async hashPassword(){
        this.password = await hash(this.password, Number(process.env.HAST_SALT));
    }
    @OneToMany(() => Customer, customer => customer.user)
    customers: Customer[];

    @Column()
    refreshToken: string;
}