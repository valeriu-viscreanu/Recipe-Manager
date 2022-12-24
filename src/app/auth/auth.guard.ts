import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import './auth.service'
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';

import * as fromAppReducer from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, 
            private readonly router: Router,
            private store: Store<fromAppReducer.AppState>){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean| UrlTree> | Promise<boolean| UrlTree> | boolean | UrlTree{
      
    return this.store.select('auth').pipe(
      take(1),
      map(s => s.user),
      map(u => {
      const isAuthenticated = !!u;
      if(isAuthenticated) {
        return true;
      }
      else{
        return this.router.createUrlTree(['/login']);
      }

    }));
  }
  
}
