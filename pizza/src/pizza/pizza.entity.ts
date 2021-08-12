/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { IsNotEmpty} from "class-validator";
import { Orders } from "src/order/order.entity";

@Entity()
export class Pizza {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    price: number;

    @Column()
    @IsNotEmpty()
    image: string;

    @Column()
    @IsNotEmpty()
    size: string;

    @OneToMany(() => Orders, (order: Orders) => order.pizza)
    public order: Orders[];
}