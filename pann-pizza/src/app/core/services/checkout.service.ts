import { User } from './../models/user.model';
import { ApiResponse } from './../models/api-response.model';
import { Router } from '@angular/router';
import { Pizza } from '../models';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../models';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private orders = new BehaviorSubject<Order[]>([]);
  orders$: Observable<Order[]> = this.orders.asObservable();

  constructor(private apiService: ApiService, private message: NzMessageService, private router: Router) { };

  orderNow(order: {}) {
    this.apiService.post('/orders', order).subscribe((order) => {
      this.message.success("Order created");
      this.router.navigate(["/order"]);
    }, err => {
      this.message.error(err.message);
    });
  };

  // getOrder(cus_id: number) {
  //   this.apiService.get(`/orders/${cus_id}`).subscribe(orders => {
  //     this.orders = orders;
  //     localStorage.setItem("nest_orders", JSON.stringify(orders));
  //   });
  // };

  getOrder(path: string): Observable<ApiResponse<Order>> {
    return this.apiService.get(path);
  };

  getAllOrder(path: string): Observable<ApiResponse<User>> {
    return this.apiService.get(path);
  };

  getCustomer(path: string): Observable<ApiResponse<User>> {
    return this.apiService.get(path);
  };

  updateStatus(path: string, status: {}): Observable<ApiResponse<Order>> {
    return this.apiService.patch(path, status);
  };
}
