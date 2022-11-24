import { Component, Input} from '@angular/core';
import { Recipe } from '../recipe.models';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent {
  @Input() recipe:Recipe; 
}
