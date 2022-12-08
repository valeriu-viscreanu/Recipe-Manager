import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.models";

@Injectable({ providedIn: 'root' })
export class RecipeService {

 
     constructor(private shoppingListService: ShoppingListService) {
     }

    selectedRecipeEvent = new Subject<Recipe>();

     recipes: Recipe[] = [
          new Recipe('Test recipes',
               'this is a test',
               'https://image.shutterstock.com/image-photo/open-recipe-book-food-related-600w-2014258427.jpg',
               [new Ingredient("meat", 5)]),
          new Recipe('Chili con carne',
               'Texas finest!!!',
               'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001451_6-c8d72b8.jpg?quality=90&webp=true&resize=300,272',
               [new Ingredient("beef", 5),
               new Ingredient("tomatos", 2),
               new Ingredient("chilli", 500)
               ])
          ];

   getRecipes(){
    return this.recipes.slice();
   }     
   getRecipe(index: number){
     return this.recipes[index];
    }  

   recipeSelected(selectedRecipe: Recipe){
        this.selectedRecipeEvent.next(selectedRecipe);
   }
   shoppingListUpdate(items: Ingredient[]) {
     this.shoppingListService.shoppingListUpdate(items);
   }
}