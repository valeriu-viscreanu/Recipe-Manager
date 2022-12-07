import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs-compat";
import { Ingredient } from "../shared/ingredients.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService{    
    
  private ingredients: Ingredient[] = [new Ingredient("Salt",3)];  
  private ingredientsChangedSubject = new Subject<Ingredient[]>();
  private ingredientSelectSubject = new Subject<number>();
  
  
  getIngredients(){
    return this.ingredients.slice();
  }
  
  selectIngredient(index: number)
  {      
    this.ingredientSelectSubject.next(index)
  }
  onSelectIngredient(f: (x: number) => void)
  {      
    this.ingredientSelectSubject.subscribe(f);
  }

  getIngredient(index: number) : Ingredient
  {
    return this.ingredients[index];
  }


  onIngredientsChanged(f: (x: Ingredient[]) => void)
  {      
    this.ingredientsChangedSubject.subscribe(f);
  }

  onDeleteItem() {
    this.ingredients.pop();
    this.ingredientsChangedSubject.next();
  }

  onClear() {
    this.ingredients.length = 0;
    this.ingredientsChangedSubject.next();
  }

  
  onAddItem(item: Ingredient) {
    this.ingredients.push(item);    
    this.ingredientsChangedSubject.next(this.ingredients);
  }

  onEditItem(item: Ingredient, index: number) {
    this.ingredients[index] = item;    
    this.ingredientsChangedSubject.next(this.ingredients);
  }

  shoppingListUpdate(items: Ingredient[]) {
    this.ingredients.push(...items);  
    this.ingredientsChangedSubject.next();
  }
}