
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./project.entity";


@Entity({ name: 'project_cancellation' })
export class ProjectCancellation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Project, (project) => project.cancellations)
    @JoinColumn({ name: 'project_id' })
    project: Project;

    @Column()
    cancellationReason: string;

    @Column()
    competencia: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    cancellationDate: Date;
}
