import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.models';
 
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipeListComponent  {
  @Output() selectedRecipeEvent = new EventEmitter<Recipe>();
  recipes: Recipe[] = [ 
    new Recipe('Test recipes','this is a test','https://image.shutterstock.com/image-photo/open-recipe-book-food-related-600w-2014258427.jpg'),
    new Recipe('Chili con carne','Texas finest!!!','https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001451_6-c8d72b8.jpg?quality=90&webp=true&resize=300,272')];
 
  OnRecipeSelected(recipe: Recipe) {
    this.selectedRecipeEvent.emit(recipe)
  }
}