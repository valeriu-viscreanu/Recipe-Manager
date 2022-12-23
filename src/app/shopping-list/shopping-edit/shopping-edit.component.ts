import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as ShoppingListAction from "../store/shopping-list.actions"
import { Ingredient } from 'src/app/shared/ingredients.model';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{

  @ViewChild('f', {static: true}) slForm: NgForm;
  editMode: boolean = false;
  editItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit(){
    this.store.select('shoppingList')
    .subscribe(s => {
      if(s.editedIngredientIndex > -1){
        this.editMode = true;
        this.editItem = s.editedIngredient;
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        })          
      }
      else{
        this.editMode = false;       
      }
    });
  }

  onSubmit() {
    const ingredient = new Ingredient(this.slForm.value.name, this.slForm.value.amount);
    if (this.editMode)
    {
      this.store.dispatch(new ShoppingListAction.UpdateIngredients({ ingredient: ingredient}))   
      this.editMode = false; 
    }
    else{
      this.store.dispatch(new ShoppingListAction.AddIngredient(ingredient))      
    }
    this.slForm.reset();
  }
  OnDeleteClick(): void {
    this.store.dispatch(new ShoppingListAction.DeleteIngredients())
   
    this.slForm.reset();
  }
  OnClearClick() {
    this.slForm.reset();
    this.editMode = false; 
    this.store.dispatch(new ShoppingListAction.StopEdit())
  }
}
