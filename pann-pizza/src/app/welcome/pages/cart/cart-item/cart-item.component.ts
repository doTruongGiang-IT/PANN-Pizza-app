import { PizzaService } from '../../../../core/services';
import { Component, Input, OnInit } from '@angular/core';
import { Pizza } from '../../../../core/models';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input('item') item!: Pizza;

  constructor(private pizzaService: PizzaService) { }

  ngOnInit(): void {
  };

  removeItem(id: number): void {
    this.pizzaService.deleteItem(id);
  };

}
