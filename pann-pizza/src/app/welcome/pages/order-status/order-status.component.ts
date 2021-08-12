import { Subscription } from 'rxjs';
import { CheckoutService } from '../../../core/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  status: string = "";
  result: any;
  statusId: number = 0;
  statusList = [{class: 'Order-placed', id: 1}, {class: 'Order-confirmation', id: 2}, 
                {class: 'Preparation', id: 3}, {class: 'Out-for-delivery', id: 4}, {class: 'Complete', id: 5}];


  constructor(private checkoutService: CheckoutService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subs.push(
      this.activatedRoute.params.subscribe((param: Params) => this.status = param.status),
    );
    this.result = this.statusList.find((item) => {
      item.class = item.class.replace("-", " ");
      return item.class.includes(this.status);
    });
    // let elements = document.querySelectorAll('.order-status-details');
    // elements.forEach(element => {
    //   let arrText = element.getElementsByTagName("p");
    //   console.log(arrText[0].innerHTML);
    // });

    // this.result.id > this.statusList[0].id ? element?.classList.add('done') : (this.result.id === this.statusList[0].id ? element?.classList.add('coming') : '');
    // this.result.id > this.statusList[1].id ? element?.classList.add('done') : (this.result.id === this.statusList[1].id ? element?.classList.add('coming') : '');
    // this.result.id > this.statusList[2].id ? element?.classList.add('done') : (this.result.id === this.statusList[2].id ? element?.classList.add('coming') : '');
    // this.result.id > this.statusList[3].id ? element?.classList.add('done') : (this.result.id === this.statusList[3].id ? element?.classList.add('coming') : '');
    // this.result.id > this.statusList[4].id ? element?.classList.add('done') : (this.result.id === this.statusList[4].id ? element?.classList.add('coming') : '');
  };

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub && sub.unsubscribe());
  };

}
