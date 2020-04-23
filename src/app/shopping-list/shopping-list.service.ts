import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  startEditingSubject = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number)
  {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    console.log('pushed to service ', ingredient)
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);    
    console.log('pushed to service ', ingredients)
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  editIngridient(position: number, ingridient: Ingredient)
  {
      this.ingredients[position] = ingridient;
      this.ingredientsChanged.emit(this.ingredients.slice());
  }

  deleteIngridient(index: number){
    console.log(this.ingredients);
    this.ingredients.splice(index,1);
    
    console.log(this.ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }

}
