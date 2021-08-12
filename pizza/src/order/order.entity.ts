/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Users } from "src/users/user.entity";
import { Pizza } from './../pizza/pizza.entity';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    address: string;

    @Column()
    @IsNotEmpty()
    placed_at: Date;

    @Column()
    @IsNotEmpty()
    status: string;

    @Column()
    @IsNotEmpty()
    quantity: number;

    @Column()
    @IsNotEmpty()
    customer_id: number;

    @Column()
    @IsNotEmpty()
    pizza_id: number;

    @IsNotEmpty()
    @ManyToOne(() => Users, (author: Users) => author.orders, {onDelete: "SET NULL"})
    @JoinColumn({ name: "customer_id" })
    user: Users;

    @IsNotEmpty()
    @ManyToOne(() => Pizza, (pizza: Pizza) => pizza.order, {onDelete: "SET NULL"})
    @JoinColumn({ name: "pizza_id" })
    pizza: Pizza;
}