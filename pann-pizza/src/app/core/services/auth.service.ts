import { Router } from '@angular/router';
import { ApiResponse, Pizza, User } from './../models';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class AuthService {
  // public isAuthenticated: boolean = false;
  // user$?: Observable<User> | undefined;

  // private user = new BehaviorSubject<User>({id: 0, username: '', email: '', password: '', profile: '', role: ''});
  user$: User | undefined;

  constructor (private apiService: ApiService, private router: Router, private message: NzMessageService) {};

  setAuth(auth: User): void {
    localStorage.setItem("nest_auth", JSON.stringify(auth));
  };

  getUser(path: string): Observable<ApiResponse<User>> {
    return this.apiService.get(path);
    // this.apiService.get(path).subscribe((user) => {
    //   localStorage
    // });
  };

  purgeAuth(): void {
    this.user$ = undefined;
    localStorage.removeItem("nest_auth");
    localStorage.removeItem("nest_orders");
    localStorage.removeItem("nest_admin_orders");
  };

  signIn(credentials: any) {
    this.apiService.post('/users/login', credentials).subscribe((user) => {
      this.user$ = user;
      this.setAuth(user);
      this.message.success("Success");
      if(user.role === "admin") {
        this.router.navigate(["/dashboard"]);
      }else {
        this.router.navigate(["/list"]);
      };
      console.log(this.user$);
    }, (err) => {
      this.message.error(err.message);
    });

    // let users = JSON.parse(window.localStorage["users"]);
    // let index = users.findIndex((user: any) => {
    //   return (user.email === credentials.email && user.password === credentials.password);
    // });
    // if(index !== -1) {
    //   this.getToken("/authentication/token/new", key).subscribe((token: AuthToken) => {
    //     this.setAuth(token.request_token);
    //     localStorage.setItem("auth", JSON.stringify(users[index]));
    //   });
    //   this.message.success("Success");
    //   return this.router.navigate(["/list"]);
    // }else {
    //   this.message.error("Your email or password is wrong");
    //   return null;
    // };
  };

  signUp(credentials: any) {
    this.apiService.post('/users/register', credentials).subscribe((user) => {
      this.user$ = user;
      this.setAuth(user);
      this.message.success("Success");
      this.router.navigate(["/list"]);
    }, (err) => {
      this.message.error(err.message);
    });
    // let users = JSON.parse(window.localStorage["users"]);
    // let index = users.findIndex((user: any) => {
    //   return (user.email === credentials.email);
    // });
    // if(index === -1) {
    //   users.push(credentials);
    //   localStorage.setItem("users", JSON.stringify(users));
    //   this.getToken("/authentication/token/new", key).subscribe((token: AuthToken) => {
    //     this.setAuth(token.request_token);
    //     localStorage.setItem("auth", JSON.stringify(credentials));
    //   });
    //   this.message.success("Success");
    //   return this.router.navigate(["/list"]);
    // }else {
    //   this.message.error("Email already used");
    //   return null;
    // };
  };

}
