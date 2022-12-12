import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshTken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService{
    constructor(private readonly http: HttpClient){       
    }

    signup<AuthResponseData>(email: string, password: string){
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAziXB8m062L3gGA_iguB67n2ueFzrfDVo',
        {
            email: email,
            password: password,
            returnSecureToken: true

        });
    }
}
