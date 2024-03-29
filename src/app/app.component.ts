import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as appState from './store/app.reducer';
import * as authActions from './auth/store/auth.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private readonly store: Store<appState.AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(authActions.autoLogin());
  }
}
