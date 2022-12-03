import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit{

  constructor(readonly recipeService: RecipeService, 
          readonly router: Router,
          readonly route: ActivatedRoute) {
  }

  recipe:Recipe; 
  id: number;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']
      this.recipe = this.recipeService.getRecipes()[this.id];
    });   
  }

  OnToShoppingListClick()
  {
    this.recipeService.shoppingListUpdate(this.recipe.ingredients);
    this.router.navigate(['shopping-list']);

  }

  OnClickEdit()
  {
     console.log(this.route)
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
