import { HttpClient } from "@angular/common/http";
import {Actions, ofType, createEffect} from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import { AuthResponseData } from "../auth.service";

import * as AuthActions from './auth.actions'
import { environment } from "src/environments/environment";
import { of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthEffects {   
    x = createEffect(() => this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap(
            (s: AuthActions.LoginStart) => {
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fbApiKey,
                    {
                        email: s.payload.email,
                        password: s.payload.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    map(x => {
                        const expDate = new Date(new Date().getTime() + +x.expiresIn * 1000);
                        return of(new AuthActions.Login({
                            email: x.email,
                            userId: x.localId,
                            token: x.idToken,
                            expirationDate: expDate,
                        }));
                    }),
                    catchError(e => {
                        return of();
                    })
                )
            })
    ),
        { dispatch: false }
    );

    constructor(private actions$: Actions, private readonly http: HttpClient){
    }
}

