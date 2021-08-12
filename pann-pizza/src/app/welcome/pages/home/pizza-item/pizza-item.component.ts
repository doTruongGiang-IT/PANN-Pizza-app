import { PizzaService } from '../../../../core/services';
import { Component, Input, OnInit } from '@angular/core';
import { Pizza } from 'src/app/core/models';

@Component({
  selector: 'app-pizza-item',
  templateUrl: './pizza-item.component.html',
  styleUrls: ['./pizza-item.component.scss']
})
export class PizzaItemComponent implements OnInit {
  @Input('pizza') pizza!: Pizza;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit(): void {
  };

  addToCart(pizza: Pizza) {
    this.pizzaService.addCart(pizza);
  };

}
