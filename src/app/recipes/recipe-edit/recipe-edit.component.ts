import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  @Input() index: number;
  editMode: boolean = false; // edit or new mode
  recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
             private recipeService: RecipeService,
             private router: Router) {
               
             }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
          
  ngOnInit() {
    this.route.params.subscribe((params: Params) =>
    {
      this.index = +params['id'];
      this.editMode = !!params['id'];
      this.initForm();
    })
  }

  private initForm(){
      let recipeName = "";
      let recipeImgPath = "";
      let recipeDescription= "";
      let recipeIngridients = new FormArray([]);

      if(this.editMode)   
      {
        const recipe = this.recipeService.getRecipe(this.index);
        recipeName = recipe.name;
        recipeImgPath = recipe.imagePath;
        recipeDescription = recipe.description;
        if(recipe.ingredients)
        {
          for(let ingredient of recipe.ingredients)
          {
             recipeIngridients.push(
                new FormGroup({
                  'name' : new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, Validators.required)
                })
             );
          }
        }
      }


      this.recipeForm = new FormGroup({
        "name" : new FormControl(recipeName, Validators.required),
        "imagePath" : new FormControl(recipeImgPath, Validators.required),
         "description" : new FormControl(recipeDescription, Validators.required),
         'ingredients': recipeIngridients
      });
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({})
    )
  }

  onCancel()  {
          this.router.navigate(['../']);
  }

  onDeleteIngredient(index: number)  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onSubmit()
  {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.index, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
}
