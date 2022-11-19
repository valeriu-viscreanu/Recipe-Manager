import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.models';
 
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [ 
    new Recipe('Test recipes','this is a test','https://image.shutterstock.com/image-photo/open-recipe-book-food-related-600w-2014258427.jpg'),
    new Recipe('Test recipes','this is a test','https://image.shutterstock.com/image-photo/open-recipe-book-food-related-600w-2014258427.jpg')];
 
  constructor() { }

  ngOnInit(): void {
  }
}