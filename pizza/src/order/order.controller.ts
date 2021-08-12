/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('api/orders')
export class OrderController {
    constructor(private orderService: OrderService) {};

    @Get()
    getAllOrders() {
        return this.orderService.getAllOrders();
    };

    @Get(':id')
    getOrder(@Param('id') id: number) {
        return this.orderService.getCusOrder(id);
    };

    @Post()
    createOrder(
        @Body('address') address: string, @Body('quantity') quantity: number,
        @Body('customer_id') customer_id: number, @Body('pizza_id') pizza_id: number
    ) {
        return this.orderService.insertOrder(address, quantity, customer_id, pizza_id);
    };

    @Patch(':id')
    updateStatus(@Param('id') id: number, @Body('status') status: string) {
        return this.orderService.updateStatus(id, status);
    };
}
