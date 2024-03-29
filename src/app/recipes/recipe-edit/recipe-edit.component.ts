import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as RecipeActions from '../store/recipe.actions'


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})

export class RecipeEditComponent implements OnInit, OnDestroy {

  editMode: boolean = false;
  id: number = -1;
  form: FormGroup;
  subscription: Subscription;

  constructor(readonly router: Router,
            readonly route: ActivatedRoute, 
            private store : Store<fromApp.AppState>) { 
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
    let recipeIngredientFormArray = new FormArray([]);    
    
    if(this.editMode)
    {
       this.subscription = this.store.select(s => s.recipes).pipe(
        map(recipeState => recipeState.recipes.find((r, index) => index == this.id)))
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe.ingredients && recipeIngredientFormArray.value.length == 0) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredientFormArray.push(new FormGroup(
                {
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, Validators.pattern(/^[1-9]+[0-9]*$/))
                }));
              }
            }
          });          
        }
        
        
    if (recipeIngredientFormArray.value.length == 0) {
      recipeIngredientFormArray.push(new FormGroup(
        {
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }))
    }

    this.form = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'ingredients': recipeIngredientFormArray
    })
  }




  onDeleteIngredient(index: number)
  {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }


  onAddIngredient(){
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
        this.store.dispatch(RecipeActions.updateRecipe(
          {
            payload: {
              index: this.id,
              newRecipe: this.form.value
            }
          }))
      }
      else{
        this.store.dispatch(RecipeActions.addRecipe(this.form.value));
      }      
      this.router.navigate(['../']);
    
    }

    ngOnDestroy(){
      if(this.subscription)  this.subscription.unsubscribe();
  }
}
  
  
  
  