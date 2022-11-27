import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.models';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent {

  @Input() recipe: Recipe;
  constructor(private recipeService: RecipeService) {     
  }

  onSelected(){
    this.recipeService.recipeSelected(this.recipe);
  }
}
