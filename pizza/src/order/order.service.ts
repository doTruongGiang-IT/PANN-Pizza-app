/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Orders } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(@InjectRepository(Orders) private orderRepository: Repository<Orders>) {};

    async getAllOrders(): Promise<Orders[]> {
        return await this.orderRepository.find();
    };

    async getOrder(id: number): Promise<Orders> {
        const order = await this.orderRepository.findOne(id);
        if(!order) throw new NotFoundException("Can't find this order");
        return order;
    };

    async getCusOrder(id: number): Promise<Orders[]> {
        const order = await this.orderRepository.find({ where: { customer_id: { id } } });
        if(!order) throw new NotFoundException("Can't find this order");
        return order;
    };

    async insertOrder(address: string, quantity: number, customer_id: number, pizza_id: number): Promise<any> {
        const today = new Date();
        const dd = String(today.getDate());
        const mm = String(today.getMonth() + 1); //January is 0!
        const yyyy = today.getFullYear();
        const placed_at = mm + '/' + dd + '/' + yyyy;
        const status = "Order placed";

        const newOrder = {address, placed_at, status, quantity, customer_id, pizza_id};
        await this.orderRepository.save(newOrder);
        return newOrder;
    };

    async updateStatus(id: number, status: string): Promise<Orders> {
        const updateOrder = await this.getOrder(id);
        if(!updateOrder) throw new NotFoundException("Can't find the order to update");
        if(status) updateOrder.status = status;
        await this.orderRepository.save(updateOrder);
        return updateOrder;
    };
}
