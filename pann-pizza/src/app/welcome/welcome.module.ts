import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WelcomeComponent } from './pages/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderStatusComponent } from './pages/order-status/order-status.component';
import { BannerComponent } from './pages/home/banner/banner.component';
import { PizzaListComponent } from './pages/home/pizza-list/pizza-list.component';
import { PizzaItemComponent } from './pages/home/pizza-item/pizza-item.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CartItemComponent } from './pages/cart/cart-item/cart-item.component';


@NgModule({
  imports: [CommonModule, WelcomeRoutingModule, NzImageModule, NzIconModule, FormsModule],
  declarations: [WelcomeComponent, HomeComponent, CartComponent, OrderComponent, OrderStatusComponent, BannerComponent, PizzaListComponent, PizzaItemComponent, CartItemComponent],
  exports: [WelcomeComponent, NzImageModule, NzIconModule, FormsModule]
})
export class WelcomeModule { }
