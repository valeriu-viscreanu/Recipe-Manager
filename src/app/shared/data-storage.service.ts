import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, map, tap } from "rxjs/operators";


import { AuthService } from "../auth/auth.service";
import * as fromRecipes from '../recipes/store/recipe.actions'
import * as fromApp from '../store/app.reducer'
import { Recipe } from "../recipes/recipe.models";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn : "root"})
export class DataStorageService{
    constructor(private readonly http: HttpClient, 
        private readonly recipeService: RecipeService, 
        private readonly authService: AuthService,
        public store: Store<fromApp.AppState>){}

    storeRecipes()
    {
        const recipes= this.recipeService.getRecipes();
        return this.http.put('https://ng-course-project-c25ff.firebaseio.com/recipes.json', recipes).subscribe();
    }

    getRecipes() {
        return this.http.get<Recipe[]>('https://ng-course-project-c25ff.firebaseio.com/recipes.json'
        )
            .pipe(map(recipes => {
                return recipes.map((recipe) => {
                    return {
                        ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                });
            }),
            tap((recipes: Recipe[]) => {
                this.store.dispatch(new fromRecipes.SetRecipes(recipes));
            }),
            catchError(err => {
                this.recipeService.setRecipes([]);
                return [];
            }));
    }
}