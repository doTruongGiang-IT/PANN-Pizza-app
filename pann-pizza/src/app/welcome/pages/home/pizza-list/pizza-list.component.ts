import { Pizza } from '../../../../core/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {
  @Input('pizzas') pizzas!: Pizza[];

  constructor() { }

  ngOnInit(): void {
    this.pizzas && this.pizzas.forEach((pizza: Pizza) => pizza.qty = 1);
  };

}
