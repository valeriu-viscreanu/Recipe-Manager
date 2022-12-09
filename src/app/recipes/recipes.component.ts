import { Component, OnInit} from '@angular/core';
import { Recipe } from './recipe.models';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  

  constructor(private recipeService: RecipeService ) {    
  }
  ngOnInit(){
    this.recipeService.selectedRecipeEvent.subscribe(
      (recipe: Recipe) => { this.selectedRecipe = recipe })
  } 
}
