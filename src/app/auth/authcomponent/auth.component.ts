import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';


@Component({
  selector: 'app-authcomponent',
  templateUrl: './authcomponent.component.html',
  styleUrls: ['./authcomponent.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isloginMode = true;
  error: string = null;
  isLoading: boolean;
  authSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.authSubscription = this.store.select('auth').subscribe( authState => {
      this.isLoading = authState.loading
      this.error = authState.authError;
    })
  }
  
  OnSubmit(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    this.isLoading = true;
    if (this.isloginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}))
    }
    else {
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}))
    }
    f.reset();
  }
  
  onSwitchMode() {
    this.isloginMode = !this.isloginMode;
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
