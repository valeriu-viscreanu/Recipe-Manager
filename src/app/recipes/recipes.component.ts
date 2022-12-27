import { Component, OnInit} from '@angular/core';
import { Recipe } from './recipe.models';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: []
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  

  constructor() {    
  }
  ngOnInit(){
  }
}
