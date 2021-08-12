/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { PizzaService } from './pizza.service';

@Controller('api/pizzas')
export class PizzaController {
    constructor(private pizzaService: PizzaService) {};

    @Get()
    getAllPizzas() {
        return this.pizzaService.getAllPizzas();
    };

    @Get(':id')
    getPizza(@Param('id') id: number) {
        return this.pizzaService.getPizza(id);
    };
}
