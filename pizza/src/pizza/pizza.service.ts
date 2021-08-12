/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pizza } from './pizza.entity';

@Injectable()
export class PizzaService {
    constructor(@InjectRepository(Pizza) private pizzaRepository: Repository<Pizza>) {};

    async getAllPizzas(): Promise<Pizza[]> {
        return await this.pizzaRepository.find();
    };

    async getPizza(id: number): Promise<Pizza> {
        const pizza = await this.pizzaRepository.findOne(id);
        if(!pizza) throw new NotFoundException("Can't find this pizza");
        return pizza;
    };
}
