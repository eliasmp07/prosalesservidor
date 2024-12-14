import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('banner')
export class Banner {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageUrl: string;

    @Column({nullable: true})
    url: string

    @Column()
    type: string;

    @Column()
    description: string;
    
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
