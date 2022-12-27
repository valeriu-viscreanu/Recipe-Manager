import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.models';
import * as fromApp from '../../store/app.reducer'
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as RecipesActions from '../store/recipe.actions'
import * as ShopppingListActions from '../../shopping-list/store/shopping-list.actions'

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit, OnDestroy{

  constructor(readonly router: Router,
    readonly route: ActivatedRoute,
    private store: Store<fromApp.AppState>) {
  }
 
  recipe:Recipe; 
  id: number;
  s : Subscription;
  ngOnInit() {
    this.s = this.route.params.pipe(map(params => +params['id']),
      switchMap(id => {
        this.id = id;
        return this.store.select(s => s.recipes);
      }),
      map(recipeState => recipeState.recipes.find((r, index) => index == this.id))
    ).subscribe(recipe => this.recipe = recipe)
  }

  ngOnDestroy() {
    this.s.unsubscribe();
  }


  OnToShoppingListClick()
  {
    this.store.dispatch(new ShopppingListActions.AddIngredients(this.recipe.ingredients))
    this.router.navigate(['shopping-list']);
  }

  OnClickEdit()
  {
     this.router.navigate(['edit'], {relativeTo: this.route});
  }

  OnDelete(){
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['../']);
  }
}
