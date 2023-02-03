import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Recipe } from "./recipe.models";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { take, map, switchMap } from "rxjs/operators";



@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<{recipes: Recipe[]}>{
    constructor(private store: Store<fromApp.AppState>,
                private actions$: Actions){
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select(s => s.recipes).pipe(
          take(1),
          map(recipesState => {
            return recipesState;
          }),
          switchMap(recipes => {
            if (recipes.recipes.length === 0) {
              this.store.dispatch(RecipesActions.fetchRecipes());
              return this.actions$.pipe(
                ofType(RecipesActions.setRecipes),
                take(1)
              );
            } else {
              return of(recipes);
            }
          })
        );
      }
}