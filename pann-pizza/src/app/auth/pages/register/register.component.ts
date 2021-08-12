import { AuthService } from './../../../core/services';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string = "";
  email: string = "";
  password: string = "";
  formSignUp!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.createFormSignUp();
  };

  resetForm(): void {
    this.formSignUp.reset();
  };
//'(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
  createFormSignUp(): void {
    this.formSignUp = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$")]]
    });
  };

  submitFormSignUp() {
    this.authService.signUp(this.formSignUp.value);
    this.resetForm();
  };

}
