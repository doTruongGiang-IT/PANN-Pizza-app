import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './../core/guards/auth.guard';
import { OrderStatusComponent } from './pages/order-status/order-status.component';
import { OrderComponent } from './pages/order/order.component';
import { CartComponent } from './pages/cart/cart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome.component';

const routes: Routes = [
  { 
    path: '', 
    component: WelcomeComponent,
    children: [
      {
        path: 'list',
        component: HomeComponent
      },
      {
        path: 'cart',
        component: CartComponent
      },
      {
        canActivate: [AuthGuard],
        path: 'order',
        component: OrderComponent
      },
      {
        canActivate: [AuthGuard],
        path: 'order/:status',
        component: OrderStatusComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
