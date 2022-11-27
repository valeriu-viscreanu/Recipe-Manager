import { Component, Input} from '@angular/core';
import { Recipe } from '../recipe.models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent {

  constructor(private recipeService: RecipeService) {
  }
  @Input() recipe:Recipe; 
  OnToShoppingListClick()
  {
    this.recipeService.shoppingListUpdate(this.recipe.ingredients);
  }
}
