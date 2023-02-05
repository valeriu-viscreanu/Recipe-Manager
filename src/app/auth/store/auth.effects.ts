import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
const handleAuthentication = (resData: AuthResponseData) => {
  const expirationDate = new Date(
    new Date().getTime() + +resData.expiresIn * 1000);
  const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
  const strUser = JSON.stringify(user);
  localStorage.setItem('userData', strUser);
  return AuthActions.authenticateSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate: expirationDate
  });
};

const handleError = (errorRes) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(AuthActions.authenticateFail({message: errorMessage}));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(AuthActions.authenticateFail({message: errorMessage}));
};

@Injectable()
export class AuthEffects {

  authSignUp = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.signupStart),
    switchMap((signupAction) => {
      return this.http.post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fbApiKey,
        {
          email: signupAction.email,
          password: signupAction.password,
          returnSecureToken: true
        }
      )
        .pipe(
          tap(resData => this.authService.setLogOutTimer(+resData.expiresIn * 1000)),
          map(resData => handleAuthentication(resData)),
          catchError(errorRes => handleError(errorRes))
        )
    })
  ));

  authLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginStart),
    switchMap((authData) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fbApiKey,
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
        .pipe(
          tap(resData => this.authService.setLogOutTimer(+resData.expiresIn * 1000)),
          map(resData => handleAuthentication(resData)),
          catchError(errorRes => handleError(errorRes))
        );
    })
  ));
  authRedirect = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.authenticateSuccess),
    tap(() => {
      this.router.navigate(['/']);
    })
  ), { dispatch: false });


  autoLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.autoLogin),
    map(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: ' ' };
      };

      const loadedUser = new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate);

      if (loadedUser.token) {

        const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogOutTimer(+ expDuration);
        return AuthActions.authenticateSuccess({
          email: userData.email,
          userId: userData.id,
          token: userData._token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });
      }
      return { type: ' ' };
    })
  ));

  authLogOut = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      localStorage.removeItem('userData');
      this.authService.clearLogoutTimmer
      this.router.navigate(['/login']);
    })
  ), { dispatch: false });


  constructor(private actions$: Actions, private http: HttpClient, private router: Router,
    private authService: AuthService
  ) { }
}
