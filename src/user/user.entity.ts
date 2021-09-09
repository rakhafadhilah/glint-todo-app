import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    token: string

    @Column()
    isActive: boolean

    @Column()
    isAdmin: boolean
}
