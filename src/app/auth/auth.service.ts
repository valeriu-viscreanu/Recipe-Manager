import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Store } from '@ngrx/store';

import { User } from "./user.model";
import * as fromAppReducer from '../store/app.reducer';
import * as fromAuthAction from './store/auth.actions';



export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshTken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenExp: any;

    constructor(private readonly http: HttpClient, private router: Router, private store: Store<fromAppReducer.AppState>) {
    }

    logout(){
        this.store.dispatch(new fromAuthAction.Logout())
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');

        if(this.tokenExp)
        {
            clearTimeout(this.tokenExp);
        }
        this.tokenExp = null;
    }

    autoLogout(expDurationMs: number){
        this.tokenExp = setTimeout(() => {
            this.logout();
        },expDurationMs)
    }

    autoLogin()
    {
        const userData = JSON.parse(localStorage.getItem('userData'))

        if(!userData){
            return;
        }  
        const loadedUser = new User(userData.email, userData.id, userData._token ,userData._tokenExpirationDate)

        if(loadedUser.token) {
            this.store.dispatch(
                new fromAuthAction.AuthenticateSuccess({
                                            email: userData.email, 
                                            userId: userData.id, 
                                            token: userData._token ,
                                            expirationDate: new Date(userData._tokenExpirationDate)
                                        })
                )}
        const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expDuration);    
     }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fbApiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true

            })
            .pipe(catchError(err => {
                let errMessage = "Error occured";
                if (!err || !err.error || !err.error.error || !err.error.error || !err.error.error.message) {
                    return throwError(errMessage);
                }

                switch (err.error.error.message) {
                    case 'EMAIL_EXISTS': errMessage = 'Email exists'
                }
                return throwError(errMessage);
            }));

    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fbApiKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(
                tap(d =>{
                    const expDate = new Date(new Date().getTime() + +d.expiresIn * 1000);
                    const user: User = new User(d.email, d.localId, d.idToken, expDate); 
                    const strUser = JSON.stringify(user)
                    this.autoLogout(+d.expiresIn * 1000);    
                    this.store.dispatch(
                        new fromAuthAction.AuthenticateSuccess({
                            email: d.email, 
                            userId: d.localId, 
                            token: d.idToken,
                            expirationDate: expDate
                        }));
                    localStorage.setItem('userData',strUser);
                    }),
                catchError(err => {
                let errMessage = "Error occured";

                if (!err || !err.statusText) {
                    return throwError(errMessage);
                }
                errMessage = 'An error occured: ' + err.statusText;

                if (err.error.error.message) {
                    switch (err.error.error.message) {
                        case 'EMAIL_NOT_FOUND': errMessage = 'Email not found';
                            break;
                        case 'INVALID_PASSWORD': errMessage = 'Invalid password';
                            break;
                    }
                }
                return throwError(errMessage);
            }));
    }
}
