import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  formSignIn!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.createFormSignIn();
  };

  resetForm(): void {
    this.formSignIn.reset();
  };
//'(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
  createFormSignIn(): void {
    this.formSignIn = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$")]]
    });
  };

  submitFormSignIn() {
    this.authService.signIn(this.formSignIn.value);
    this.resetForm();
  };

}
