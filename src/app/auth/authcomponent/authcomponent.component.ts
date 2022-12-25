import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs-compat';
import { AuthResponseData, AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer'
import * as AuthActions from '../store/auth.actions'


@Component({
  selector: 'app-authcomponent',
  templateUrl: './authcomponent.component.html',
  styleUrls: ['./authcomponent.component.css']
})
export class AuthComponent implements OnInit {
  isloginMode = true;
  error: string = null;
  isLoading: boolean;
  obs: Observable<AuthResponseData>;


  constructor(private readonly authService: AuthService, 
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }
  ngOnInit() {
    this.store.select('auth').subscribe( authState => {
      this.isLoading = authState.loading
      this.error = authState.authError;
      if(authState.user && !this.error)
      {
         this.router.navigate(["./recipes"])      
      }
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
      this.obs = this.authService.signup(email, password)
    }
  
   f.reset();
  }

  onSwitchMode() {
    this.isloginMode = !this.isloginMode;
  }
}
