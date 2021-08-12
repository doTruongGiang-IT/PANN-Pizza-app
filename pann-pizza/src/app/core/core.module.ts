import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, ApiService, PizzaService } from './services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthService,
    ApiService,
    PizzaService
  ]
})
export class CoreModule { }
