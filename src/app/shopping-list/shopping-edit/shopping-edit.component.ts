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

  onSubmit() {
    // if (!inputName|| inputName.value == "" || !inputAmount || inputAmount.value == "") {
    //   alert("Please Fill All Required Fields");
    //   return false;
    // }
    const ingredient = new Ingredient(this.slForm.value.name, this.slForm.value.amount);
    if (this.editMode)
    {
      this.shoppingListService.onEditItem(ingredient, this.editedItemIndex);
      this.editMode = false; 
    }
    else{
      this.shoppingListService.onAddItem(ingredient);
      
    }
    this.slForm.reset();
  }
  OnDeleteClick(): void {
    this.shoppingListService.onDeleteItem(this.editedItemIndex);
    this.slForm.reset();
  }
  OnClearClick() {
    this.slForm.reset();
  }
}
