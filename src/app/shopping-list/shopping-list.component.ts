import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromStore.AppState>) { }  
  
  ngOnInit() {
    this.ingredients = this.store.select(s => s.shoppingList);
  }
  OnEditItemClick(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }
} 
