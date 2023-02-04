import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as ShoppingListAction from "../store/shopping-list.actions"
import { Ingredient } from 'src/app/shared/ingredients.model';
import * as fromStore from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{

  @ViewChild('f', {static: true}) slForm: NgForm;
  editMode: boolean = false;
  editItem: Ingredient;

  constructor(private store: Store<fromStore.AppState>) {
  }

  ngOnInit(){
    this.store.select(s => s.shoppingList)
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
      this.store.dispatch(ShoppingListAction.updateIngredient(ingredient))   
      this.editMode = false; 
    }
    else{
      this.store.dispatch(ShoppingListAction.addIngredient(ingredient))      
    }
    this.slForm.reset();
  }
  OnDeleteClick(): void {
    this.store.dispatch(ShoppingListAction.deleteIngredients())
   
    this.slForm.reset();
  }
  OnClearClick() {
    this.slForm.reset();
    this.editMode = false; 
    this.store.dispatch(ShoppingListAction.stopEdit())
  }
}
