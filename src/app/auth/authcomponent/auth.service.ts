import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { Subject } from "rxjs-compat";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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
    user = new Subject<User>();
    constructor(private readonly http: HttpClient) {
    }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAziXB8m062L3gGA_iguB67n2ueFzrfDVo',
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
            }),
            tap(d =>{
                    const expDate = new Date(new Date().getTime() + +d.expiresIn * 1000);
                    const user = new User(d.email, d.localId, d.idToken, expDate);
                    this.user.next(user);
            }));

    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAziXB8m062L3gGA_iguB67n2ueFzrfDVo',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(err => {
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
