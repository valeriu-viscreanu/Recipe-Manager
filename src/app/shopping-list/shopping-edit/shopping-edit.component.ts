import { Component, Output,EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent{

  @Output() addItem = new EventEmitter<Ingredient>();
  @Output() deleteItem = new EventEmitter();
  @Output() clear = new EventEmitter();

  OnAddClick(inputName, inputAmount){
    this.addItem.emit(new Ingredient(inputName.value,inputAmount.value));
  }
  OnDeleteClick(){
    this.deleteItem.emit();
  }
  OnClearClick(){
  }

}
