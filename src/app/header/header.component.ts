import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';

import * as fromAppReducer from '../store/app.reducer';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isAuthenticated = false;
  userSub: Subscription;

  constructor(public dataStorageService: DataStorageService, 
              private store: Store<fromAppReducer.AppState>){}

  ngOnInit(){
    this.store.select('auth')
      .pipe(map(state => {
        return state.user
      }))
      .subscribe(
        user => {
          this.isAuthenticated = !!user;
        });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onLogout()
  {
    this.store.dispatch(new AuthActions.Logout)
  }

  onFetchData(){
    this.dataStorageService.getRecipes().subscribe();
  }
}
