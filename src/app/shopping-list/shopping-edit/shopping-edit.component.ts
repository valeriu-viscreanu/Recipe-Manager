import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private shoppingListService: ShoppingListService) {
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

  onSubmit(f: NgForm) {
    // if (!inputName|| inputName.value == "" || !inputAmount || inputAmount.value == "") {
    //   alert("Please Fill All Required Fields");
    //   return false;
    // }
    const ingredient = new Ingredient(f.value.name, f.value.amount);
    if (this.editMode)
    {
      this.shoppingListService.onEditItem(ingredient, this.editedItemIndex);
      this.editMode = false; 
    }
    else{
      this.shoppingListService.onAddItem(ingredient);
      
    }
  }
  OnDeleteClick(): void {
    this.shoppingListService.onDeleteItem();
  }
  OnClearClick() {
    this.shoppingListService.onClear();
  }
}
