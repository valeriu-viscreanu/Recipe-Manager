import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-authcomponent',
  templateUrl: './authcomponent.component.html',
  styleUrls: ['./authcomponent.component.css']
})
export class AuthComponent implements OnInit {
  isloginMode = true;
  error: string = null;

  constructor(private readonly authService: AuthService) {
  }
  ngOnInit() {
  }

  OnSubmit(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    if (this.isloginMode) {

     }
    else {
      this.authService.signup(email, password).subscribe(
        answer => {
          console.log(answer);
        },
        error => {
          this.error = 'An error occured'
          console.log(error);
        });
    }

    f.reset();
  }

  onSwitchMode() {
    this.isloginMode = !this.isloginMode;
  }
}
