import { Subscription } from 'rxjs';
import { ApiResponse } from './../../../core/models/api-response.model';
import { CheckoutService } from './../../../core/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, Order } from '../../../core/models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  user!: User;
  orders!: any;
  private subs: Subscription[] = [];

  constructor(public checkoutService: CheckoutService) { 
    if(localStorage.getItem('nest_auth') !== null) this.user = JSON.parse(window.localStorage['nest_auth']);
    this.subs.push(
      this.checkoutService.getOrder(`/orders/${this.user.id}`).subscribe((orders: ApiResponse<Order[]>) => {
        localStorage.setItem("nest_orders", JSON.stringify(orders));
        this.orders = orders;
      })
    );
  };

  ngOnInit(): void {
    if(localStorage.getItem('nest_orders') !== null) this.orders = JSON.parse(window.localStorage['nest_orders']);
    // this.checkoutService.orders$.subscribe(orders => this.orders = orders)
  };

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      if(sub) sub.unsubscribe();
    });
  };

}
