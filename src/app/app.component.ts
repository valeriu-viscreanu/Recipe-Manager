import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MenuItem } from './shared/menuitem.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService) {
  }

  ngOnInit() {
    this.authService.autoLogin();
  }
}
