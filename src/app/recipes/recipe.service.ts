import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AppModule } from "../app.module";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.models";

@Injectable({ providedIn: 'root' })
export class RecipeService {


  constructor(private shoppingListService: ShoppingListService) {
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
  this.shoppingListService.shoppingListUpdate(items);
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