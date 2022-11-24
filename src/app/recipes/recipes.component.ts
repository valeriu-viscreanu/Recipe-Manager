import { Component} from '@angular/core';
import { Recipe } from './recipe.models';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent  {
  selectedRecipe: Recipe;
  
  OnRecipeSelected(selectedRecipe: Recipe){
    this.selectedRecipe = selectedRecipe;
  }  
}
