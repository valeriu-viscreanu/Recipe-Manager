import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Store } from '@ngrx/store';
import { Ingredient } from "../shared/ingredients.model";
import { Recipe } from "./recipe.models";
import * as ShoppingListAction from '../shopping-list/store/shopping-list.actions'

import * as fromStore from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class RecipeService {


  constructor(private store: Store<fromStore.AppState>) {
  }

  selectedRecipeEvent = new Subject<Recipe>();
  recipesChangedEvent = new Subject<Recipe[]>();

  private recipes: Recipe[] = []

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChangedEvent.next(this.recipes.slice())
  }

  recipeSelected(selectedRecipe: Recipe) {
    this.selectedRecipeEvent.next(selectedRecipe);
  }

   shoppingListUpdate(items: Ingredient[]) {
     this.store.dispatch(new ShoppingListAction.AddIngredients(items));  
   }

   addRecipe(recipe: Recipe)
   {
     this.recipes.push(recipe)
     this.recipesChangedEvent.next(this.recipes)
   }

   updateRecipe(index:number, recipe: Recipe)
   {
     this.recipes[index]= recipe;     
     this.recipesChangedEvent.next(this.recipes)
   }

   deleteRecipe(index:number)
   {
     this.recipes.splice(index,1)
     this.recipesChangedEvent.next(this.recipes)
   }
}