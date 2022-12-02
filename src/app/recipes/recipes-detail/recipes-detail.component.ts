import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe.models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent {

  constructor(readonly recipeService: RecipeService, readonly router: Router) {
  }
  @Input() recipe:Recipe; 
  OnToShoppingListClick()
  {
    this.recipeService.shoppingListUpdate(this.recipe.ingredients);
    this.router.navigate(['\shopping-list']);

  }
}
