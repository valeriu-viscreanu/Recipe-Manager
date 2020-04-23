import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  error = "";
  isLoading = false;
  constructor(private authService : AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSwitchMode()
  {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){

    if(!form.valid) return;

    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authObs:Observable<AuthResponseData>;
    
    if (this.isLoginMode){
      authObs = this.authService.login(email, password);
    }
    else{
      authObs = this.authService.signup(email, password);                      
    }

    authObs.subscribe(
      result => { 
        this.isLoading = false;
        this.router.navigate(['./recipes']);
      },
      error => {
                this.error = error;
                this.isLoading = false;
      });
   
    form.reset();
  }


  OnCloseAlert(){
    this.error = null;
  }

}
