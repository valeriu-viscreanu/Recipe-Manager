import { Component } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent{
  
  constructor(private shoppingListService: ShoppingListService){

  }
  OnAddClick(inputName, inputAmount){
    if (!inputName|| inputName.value == "" || !inputAmount || inputAmount.value == "") {
      alert("Please Fill All Required Fields");
      return false;
    }
    
    this.shoppingListService.onAddItem(new Ingredient(inputName.value, inputAmount.value));
  }
  OnDeleteClick(){
    this.shoppingListService.onDeleteItem();
  }
  OnClearClick(){
    this.shoppingListService.onClear();
  }

}
