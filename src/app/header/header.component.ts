import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/store/auth.actions';

import * as fromAppReducer from '../store/app.reducer';
import * as RecipeActions from '../recipes/store/recipe.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isAuthenticated = false;
  userSub: Subscription;

  constructor(private store: Store<fromAppReducer.AppState>){}

  ngOnInit(){
    this.store.select(s => s.auth)
      .pipe(map(state => {
        return state.user
      }))
      .subscribe(
        user => {
          this.isAuthenticated = !!user;
        });
  }

  onSaveData(){
    this.store.dispatch(RecipeActions.storeRecipe());
  }

  onLogout()
  {
    this.store.dispatch(AuthActions.logout())
  }

  onFetchData(){
    this.store.dispatch(RecipeActions.fetchRecipes());
  }
}
