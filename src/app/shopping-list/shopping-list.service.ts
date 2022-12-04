import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs-compat";
import { Ingredient } from "../shared/ingredients.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService{    
    
  private ingredients: Ingredient[] = [new Ingredient("Salt",3)];  
  ingredientsChangedEvent = new Subject<Ingredient[]>();

  getIngredients(){
    return this.ingredients.slice();
  }
   
  onDeleteItem() {
    this.ingredients.pop();
    this.ingredientsChangedEvent.next();
  }

  onClear() {
    this.ingredients.length = 0;
    this.ingredientsChangedEvent.next();
  }

  onAddItem(item: Ingredient) {
    this.ingredients.push(item);
    this.ingredientsChangedEvent.next();
  }

  shoppingListUpdate(items: Ingredient[]) {
    this.ingredients.push(...items);  
    this.ingredientsChangedEvent.next();
  }
}