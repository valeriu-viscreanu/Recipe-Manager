import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.models';
import * as RecipeActions from './recipe.actions'
import * as fromApp from '../../store/app.reducer' 
import { Store } from '@ngrx/store';

@Injectable()
export class RecipeEffects{    
    @Effect()
    fetchRecipes = this.actions$.pipe(
                        ofType(RecipeActions.FETCH_RECIPES),
                        switchMap(() => {
                            return this.http.get<Recipe[]>('https://ng-course-project-c25ff.firebaseio.com/recipes.json')
                        }),
                        map(recipes => {
                            if(recipes){
                                        return recipes.map((recipe) =>
                                         {
                                            return {
                                                ...recipe, 
                                                ingredients: recipe.ingredients ? recipe.ingredients : []
                                            };
                                        })
                                    }
                                else{
                                    return [];
                                }
                        }),
                        map(recipes => new RecipeActions.SetRecipes(recipes))
    );

    @Effect()
    storeRecipes = this.actions$.pipe(
        ofType(RecipeActions.STORE_RECIPE),
        withLatestFrom(this.store.select(r => r.recipes)),
        switchMap(([a,recipeState]) => {
            const recipes= recipeState.recipes;
            return this.http.put('https://ng-course-project-c25ff.firebaseio.com/recipes.json', recipes);
        
        })
    )

    constructor(private actions$: Actions,
                private readonly http: HttpClient,
                private store: Store<fromApp.AppState>) {
    }
}