import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (localStorage.getItem('userToken') != null && localStorage.getItem('role') == 'ADMIN') {
      return true
    } else if (localStorage.getItem('userToken') != null && localStorage.getItem('role') == 'LANDLORD') {
      return true
    } else {
      this.router.navigate(['/Login']), {
        relativeTo: this.route,
      }
      return false;
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('userToken') != null && localStorage.getItem('role') == 'ADMIN') {
      return true
    } else if (localStorage.getItem('userToken') != null && localStorage.getItem('role') == 'LANDLORD') {
      return true
    } else {
      this.router.navigate(['/Login']), {
        relativeTo: this.route,
      }
      return false;
    }

  }

}
