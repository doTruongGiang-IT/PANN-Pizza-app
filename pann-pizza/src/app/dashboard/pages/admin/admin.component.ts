import { Subscription } from 'rxjs';
import { User } from './../../../core/models/user.model';
import { ApiResponse } from './../../../core/models/api-response.model';
import { PizzaService } from '../../../core/services';
import { Order, Pizza } from './../../../core/models';
import { CheckoutService } from '../../../core/services';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  admin_orders!: any;
  status: string = "";
  names: any[] = [];
  private subs: Subscription[] = [];

  constructor(private checkoutService: CheckoutService, private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.loadOrders();
  };

  loadOrders(): void {
    this.subs.push(
      this.checkoutService.getAllOrder('/orders').subscribe((orders: ApiResponse<Order[]>) => {
        localStorage.setItem("nest_admin_orders", JSON.stringify(orders));
        this.admin_orders = orders;
        this.loadCus();
        this.loadPizza();
      }),
      this.admin_orders.filter((order: Order) => order.status !== 'Complete')
    );
  };

  loadCus(): void {
    this.subs.push(
      this.admin_orders.forEach((order: Order) => {
        this.checkoutService.getCustomer(`/users/${order.customer_id}`).subscribe((username: ApiResponse<User>) => {
          order.cusName = username;
        });
        // this.checkoutService.getCus(order.id, order.customer_id); 
        // this.names = JSON.parse(window.localStorage['nest_cus_name']);
        // this.names.forEach(name => {
        //   if(order.customer_id === name.cus.id) order.cusName = name.cus.username;
        // });
      })
    );
  };

  loadPizza(): void {
    this.subs.push(
      this.admin_orders.forEach((order: Order) => {
        this.pizzaService.getSinglePizza(`/pizzas/${order.pizza_id}`).subscribe((pizza: ApiResponse<Pizza>) => {
          order.pizzaName = pizza;
        });
  
      })
    );
  };

  updateStatus(id: number, status: string) {
    this.subs.push(
      this.checkoutService.updateStatus(`/orders/${id}`, {status}).subscribe((order: ApiResponse<Order>) => {
        console.log(order);
      })
    );
  };

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      if(sub) sub.unsubscribe();
    });
  };

}
