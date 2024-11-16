import { Customer } from "src/customers/entity/customer.entity";
import { Purchase } from "src/purchase/entity/purchase.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'project' })
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameProject: string;
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valorProject: number;
    
    @Column()
    progress: number;

    @ManyToOne(() => Customer, customer => customer.projects, { onDelete: 'CASCADE' })
    customer: Customer;

    @Column()
    status: string;

    @OneToMany(() => Purchase,(purchase) => purchase.project)
    products: Purchase[];

    @Column({ default: false })
    isCancel: boolean;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

}
