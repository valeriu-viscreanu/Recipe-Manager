import { IvyDeclarationDtsTransform } from '@angular/compiler-cli/src/ngtsc/transform';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.models';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode: boolean = false;
  id: number = -1;
  form: FormGroup;

  constructor(readonly router: Router,
    readonly route: ActivatedRoute, readonly recipeService: RecipeService) { 
    }

    ngOnInit() {      
      this.route.params.subscribe((params: Params) => {
        this.id = +params['id']
        this.editMode = !isNaN(this.id);       
        this.formInit();
      });
  }
  
  formInit(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredient = new FormArray([]);
    

    if(this.editMode)
    {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe.ingredients)
      {
        for (let ingredient of recipe.ingredients) {
          recipeIngredient.push(new FormGroup(
            {
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, Validators.pattern(/^[1-9]+[0-9]*$/))
            }));
        }
      }
    }

    if(recipeIngredient.length == 0)
    {
      recipeIngredient.push(new FormGroup(
        {
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }))
    }

    this.form = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'ingredients': recipeIngredient
    })
  }
  onDeleteIngredient(index: number)
  {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }
  onAddIngredint(){
    (<FormArray>this.form.get('ingredients')).push(
    new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])   
    }));
  }
  
  get controls() { // a getter!
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  onSubmit()
  {
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.form.value)
    }
    else{
      this.recipeService.addRecipe(this.form.value)
    }
  }
}
