import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  
  ingredients: Ingredient[] = [new Ingredient("Peper",3)];
  constructor() { }  
  
  onDeleteItem() {
    this.ingredients.pop();
  }
  onClear() {
    this.ingredients.length = 0;
  }
  onAddItem(item: Ingredient) {
    this.ingredients.push(item);
  }
}
