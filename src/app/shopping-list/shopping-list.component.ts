import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store' 

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable< {ingredients: Ingredient[]}>;

  constructor(private slService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.ingredients =  this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
  }

  onEditItem (i: number)
  {
    this.slService.startEditingSubject.next(i);
  }
}
