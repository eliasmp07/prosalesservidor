import { User } from "src/users/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('ticket')
export class Ticket {
      @PrimaryGeneratedColumn()
      id: number;


}
