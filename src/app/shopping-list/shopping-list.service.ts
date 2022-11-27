import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredients.model";

@Injectable({providedIn: 'any'})
export class ShoppingListService{    
    
  private ingredients: Ingredient[] = [new Ingredient("Salt",3)];  
  ingredientsChangedEvent = new EventEmitter();

  getIngredients(){
    return this.ingredients.slice();
  }
   
  onDeleteItem() {
    this.ingredients.pop();
    this.ingredientsChangedEvent.emit();
  }

  onClear() {
    this.ingredients.length = 0;
    this.ingredientsChangedEvent.emit();
  }

  onAddItem(item: Ingredient) {
    this.ingredients.push(item);
    this.ingredientsChangedEvent.emit();
  }
}