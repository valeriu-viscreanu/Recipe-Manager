import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';

import * as fromAppReducer from '../store/app.reducer';
import * as fromAuthAction from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private tokenExp: any;

    constructor(private store: Store<fromAppReducer.AppState>) {
    }

    setLogOutTimer(expDurationMs: number){
        this.tokenExp = setTimeout(() => {
            this.store.dispatch(fromAuthAction.logout());
        },
        expDurationMs)
    }

    clearLogoutTimmer() {
        if(this.tokenExp)
        clearTimeout(this.tokenExp)
        this.tokenExp = null;
    }


}
