import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map,tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor(private http: HttpClient, private recipeService: RecipeService){}

    storeRecipe()
    {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://ng-course-project-c25ff.firebaseio.com/recipes.json/', recipes)
                .subscribe(r => {console.log(r)});
    }

    fetchRecipe()
    {
        return this.http.get<Recipe[]>('https://ng-course-project-c25ff.firebaseio.com/recipes.json/')
        .pipe(map(recipes => {
                            return recipes.map( recipe => {  return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };  })
                         }),
          tap(recipes => {this.recipeService.setRecipes(recipes)}));
    }
}
