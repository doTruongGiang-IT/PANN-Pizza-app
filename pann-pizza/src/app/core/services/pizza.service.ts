import { ApiResponse } from './../models/api-response.model';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pizza } from '..';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  arrCart: Pizza[] = [];
  private cartProducts = new BehaviorSubject<Pizza[]>([]);
  cartProducts$: Observable<Pizza[]> = this.cartProducts.asObservable();

  constructor(private apiService: ApiService) { };

  getPizzaList(path: string): Observable<ApiResponse<Pizza[]>> {
    return this.apiService.get(path);
  };

  getSinglePizza(path: string): Observable<ApiResponse<Pizza>> {
    return this.apiService.get(path);
  };

  addCart(pizza: Pizza): Observable<Pizza[]> {
    let index = this.arrCart.findIndex((cartItem) => cartItem.id === pizza.id);
    if(index === -1) {
      this.arrCart.push(pizza);
    }else {
      this.arrCart[index].qty += 1;
    };
    this.cartProducts.next(this.arrCart);
    // localStorage.setItem("nest_cart", JSON.stringify(this.arrCart));
    return this.cartProducts;
  };

  deleteItem(id: number): Observable<Pizza[]> {
    this.arrCart = this.arrCart.filter((cartItem) => cartItem.id !== id);
    this.cartProducts.next(this.arrCart);
    // localStorage.setItem("nest_cart", JSON.stringify(this.arrCart));
    return this.cartProducts;
  };
}
