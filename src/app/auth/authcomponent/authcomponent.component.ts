import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs-compat';
import { AuthResponseData, AuthService } from './auth.service';

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


  constructor(private readonly authService: AuthService, private router: Router) {
  }
  ngOnInit() {
    
  }

  OnSubmit(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    this.isLoading = true;
    if (this.isloginMode) {
      this.obs = this.authService.login(email, password);
    }
    else {
      this.obs = this.authService.signup(email, password)
    }
    this.obs.subscribe(
      answer => {
        this.router.navigate(["./recipes"])
        console.log('reply:');
        console.log(answer);
        this.isLoading = false;
      },
      error => {
        this.error = error;
        this.isLoading = false;
      });
   f.reset();
  }

  onSwitchMode() {
    
    this.isloginMode = !this.isloginMode;
  }
}
