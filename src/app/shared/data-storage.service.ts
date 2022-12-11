import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn : "root"})
export class DataStorageService{
    constructor(private readonly http: HttpClient, private readonly recipeService: RecipeService){}

    storeRecipes()
    {
        const recipes= this.recipeService.getRecipes();
        return this.http.put('https://ng-course-project-c25ff.firebaseio.com/recipes.json', recipes).subscribe((d)=> {console.log(d)});
    }
}