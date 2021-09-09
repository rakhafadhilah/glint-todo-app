import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todo{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: string;

    @Column()
    title: string;

    @Column()
    desc: string;

    @Column()
    image: string;

    @Column({default: false})
    status: boolean;
}