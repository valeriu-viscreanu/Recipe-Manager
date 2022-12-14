import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import './auth.service'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean| UrlTree> | Promise<boolean| UrlTree> | boolean | UrlTree{
    return this.authService.user.pipe(
      take(1),
      map(u => {
      const isAuthenticated = !!u;
      debugger
      if(isAuthenticated) {
        return true;
      }
      else{
        return this.router.createUrlTree(['/login']);
      }

    }));
  }
  
}
