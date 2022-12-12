import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.models";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn : "root"})
export class DataStorageService{
    constructor(private readonly http: HttpClient, private readonly recipeService: RecipeService){}

    storeRecipes()
    {
        const recipes= this.recipeService.getRecipes();
        return this.http.put('https://ng-course-project-c25ff.firebaseio.com/recipes.json', recipes).subscribe();
    }

    getRecipes() 
    {   
        return this.http.get<Recipe[]>('https://ng-course-project-c25ff.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                    return recipes.map((recipe) => {
                        return {
                            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                        }
                    });
                }
                ),
                tap((recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }));
    }
}