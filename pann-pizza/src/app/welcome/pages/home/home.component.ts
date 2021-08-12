import { ApiResponse } from './../../../core/models';
import { Pizza } from '../../../core/models';
import { PizzaService } from '../../../core/services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  pizzas: any;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit(): void {
    this.loadPizzas();
  };

  loadPizzas(): void {
    this.subs.push(
      this.pizzaService.getPizzaList("/pizzas").subscribe((pizzaList: ApiResponse<Pizza[]>) => {
        this.pizzas = pizzaList;
      }),
    );
  };

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      if(sub) {
        sub.unsubscribe();
      };
    });
  };

}
