
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
  @Output() 
  recipes: Recipe[];
  
  constructor(readonly recipeService: RecipeService, 
              readonly router: Router,
              readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipeClick(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }  
}