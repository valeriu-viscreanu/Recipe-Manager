import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.models';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent {

  @Input() recipe: Recipe;
  @Output() selectedEvent = new EventEmitter<Recipe>();

  onSelected(){
    this.selectedEvent.emit(this.recipe)
  }
}
