import { ApiResponse } from './../../../core/models/api-response.model';
import { User } from './../../../core/models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  id: number = 0;
  // user: User = {id: 0, username: '', email: '', password: '', profile: ''};
  user!: any;

  constructor(private router: Router, public authService: AuthService) { 
    // if(window.localStorage['nest_auth'] !== null || window.localStorage['nest_auth'] === null) {
    //   this.id = JSON.parse(window.localStorage['nest_auth']).id;
    //   this.ngOnInit();
    // };
    // this.subs.push(
    //   this.authService.user$.subscribe(user => {
    //     if(user.email !== "") this.ngOnInit();
    //   })
    // );
    // if(localStorage.getItem('nest_auth')) this.ngOnInit();
  }

  ngOnInit(): void {
    // this.authService.getUser(`/users/${this.id}`).subscribe((user: ApiResponse<User>) => {
    //   this.user = user;
    // });
    // this.subs.push(
    //   this.authService.user$.subscribe((user: User) => {
    //     if(user.id > 0) {
    //       this.authService.getUser(`/users/${user.id}`);
    //       console.log(user);
    //     }
    //   })
    // );
    // if(localStorage.getItem('nest_auth')) this.user = JSON.parse(window.localStorage['nest_auth']);
  };

  openMenuMobile(): void {
    let menu = document.querySelector('.header-list-mobileContainer');
    menu && menu.classList.add('open');
  };

  closeMenuMobile(): void {
    let menu = document.querySelector('.header-list-mobileContainer');
    menu && menu.classList.remove('open');
  };

  logout(): void {
    this.authService.purgeAuth();
  };

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      if(sub) {
        sub.unsubscribe();
      };
    });
  };

}
