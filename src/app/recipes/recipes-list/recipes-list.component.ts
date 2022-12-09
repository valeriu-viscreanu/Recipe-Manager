
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipes: Recipe[];
  
  constructor(private recipeService: RecipeService, 
              readonly router: Router,
              readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipesChangedEvent.subscribe((recipes: Recipe[])=> {
      this.recipes = recipes;
    })
  }
  onNewRecipeClick(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }  
}