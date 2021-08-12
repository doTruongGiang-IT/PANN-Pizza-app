import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {
  @Input('control') control!: any;

  constructor() { }

  ngOnInit(): void {
  };

  get message() {
    let errorMessage = "";
    for(let error in this.control.errors) {
      if(this.control.dirty) {
        if(error === "required") {
          errorMessage = "Please fill in this field";
        }else if(error === "email") {
          errorMessage = "Your email is wrong";
        }else {
          errorMessage = "Your password is wrong";
        };
      };
    };
    return errorMessage;
  };

}
