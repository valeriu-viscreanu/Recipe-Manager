import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: {ingredients: Ingredient[]}}>) { }  
  
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }
  OnEditItemClick(index: number) {
    this.shoppingListService.selectIngredient(index);
  }
}
