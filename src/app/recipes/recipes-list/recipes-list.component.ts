
import { Component, OnInit, Output } from '@angular/core';
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
  
  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  
}