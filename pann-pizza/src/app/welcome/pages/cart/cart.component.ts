import { Subscription } from 'rxjs';
import { PizzaService, CheckoutService } from '../../../core/services';
import { Pizza, User } from '../../../core/models';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  total: number = 0;
  cart!: any[];
  address: any = null;
  user!: User;
  private subs: Subscription[] = [];

  constructor(public pizzaService: PizzaService, private checkoutService: CheckoutService) { 
  };

  ngOnInit(): void {
    if(localStorage.getItem('nest_auth') !== null) this.user = JSON.parse(window.localStorage['nest_auth']);
    this.subs.push(
      this.pizzaService.cartProducts$.subscribe((cart) => {
        let result = 0;
        cart.forEach(item => result += item.price*item.qty);
        this.total = result;
        // if(localStorage.getItem("nest_cart") !== null) {
        //   this.cart = JSON.parse(window.localStorage["nest_cart"]);
        //   this.cart.forEach(item => this.total += item.price*item.qty);
        // };
      })
    );
  };

  order(cart: Pizza[]) {
    cart.forEach(item => {
      let order = {
        address: this.address,
        quantity: item.qty,
        customer_id: this.user.id,
        pizza_id: item.id
      };
      this.checkoutService.orderNow(order);
    });
  };  

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      if(sub) sub.unsubscribe();
    });
  };

}
