import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';


@Injectable({providedIn: "root"})
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private readonly authService: AuthService,
                private store: Store<fromAppReducer.AppState>){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        return this.store.select('auth').pipe(
            take(1),
            map(a =>{
                return a.user
            }),
            exhaustMap(user => {
                    if(!user)  return next.handle(req);                
                    const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)});
                    return next.handle(modifiedReq);
            })
        );
    }
}