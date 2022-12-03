import { Component, Input } from '@angular/core';
import { Recipe } from '../../recipe.models';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent {
  @Input() recipe: Recipe;
  @Input() id: number;
}
