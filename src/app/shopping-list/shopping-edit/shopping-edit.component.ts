import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store' 
//import * as ShoppingListAction from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm:NgForm
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private slService: ShoppingListService, private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.subscription = this.slService.startEditingSubject.subscribe(
     (index: number) =>
     {
      console.log('observer to store')
        this.editMode = true;
        this.editItemIndex = index;
        this.editItem = this.slService.getIngredient(index);
        this.slForm.setValue({name: this.editItem.name, amount: this.editItem.amount})
     }

    ) 
  }

  onAddItem(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    //this.slService.addIngredient(newIngredient);
   // this.store.dispatch(new ShoppingListAction.Addingredient(newIngredient));
    console.log('added to store')
    this.editMode = false;
    this.slForm.reset();
  }

  onEditItem(form: NgForm) {
    const newValue = new Ingredient(form.value.name, form.value.amount);
    this.slService.editIngridient(this.editItemIndex, newValue);
    console.log('edit to store')
    this.editMode = false;
    this.slForm.reset();
  }

  onReset(){
    this.editMode = false;
     this.slForm.reset();

  }

  onDelete(){
    this.slService.deleteIngridient(this.editItemIndex);
    this.slForm.reset();
    this.editMode = false;
  }

 ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
