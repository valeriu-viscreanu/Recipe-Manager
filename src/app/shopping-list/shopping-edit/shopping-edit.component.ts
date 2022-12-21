import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as ShoppingListAction from "../store/shopping-list.actions"
import { Ingredient } from 'src/app/shared/ingredients.model';

import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{

  @ViewChild('f', {static: true}) slForm: NgForm;
  editMode: boolean = false;
  editedItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService, 
              private store: Store<{ shoppingList: {ingredients: Ingredient[]}}>) {
  }

  ngOnInit(){
    this.shoppingListService.onSelectIngredient((itemIndex)=>{
      this.editMode = true;
      this.editedItemIndex = itemIndex;
      this.editItem = this.shoppingListService.getIngredient(itemIndex);
      this.slForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount,
      })
    });
  }

  onSubmit() {
    const ingredient = new Ingredient(this.slForm.value.name, this.slForm.value.amount);
    if (this.editMode)
    {
      this.store.dispatch(new ShoppingListAction.UpdateIngredients({ index: this.editedItemIndex, ingredient: ingredient}))
   
      this.editMode = false; 
    }
    else{
      this.store.dispatch(new ShoppingListAction.AddIngredient(ingredient))      
    }
    this.slForm.reset();
  }
  OnDeleteClick(): void {
    this.store.dispatch(new ShoppingListAction.DeleteIngredients(this.editedItemIndex))
   
    this.slForm.reset();
  }
  OnClearClick() {
    this.slForm.reset();
  }
}
