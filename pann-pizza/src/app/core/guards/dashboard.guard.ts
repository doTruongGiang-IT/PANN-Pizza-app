import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private message: NzMessageService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.auth.user$) {
        this.message.error('access denied')
        this.router.navigate(['/login']);
        return false;
    }else {
        let user = JSON.parse(window.localStorage['nest_auth']);
        if(user.role !== "admin") {
            this.message.error('access denied')
            this.router.navigate(['/list']);
            return false;
        }; 
    };
    // if(this.auth.user$) {
    //   return this.auth.user$.pipe(
    //     take(1),
    //     map(user => !!user),
    //     tap(loggedIn => {
    //       if (!loggedIn) {
    //         this.message.error('access denied')
    //         this.router.navigate(['/login']);
    //       }
    //     })
    //   )  
    // }

    return true;
  }
  
}
