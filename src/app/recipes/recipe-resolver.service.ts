import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.models";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor( private readonly dataStorageService: DataStorageService, private recipesService: RecipeService){
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        const localRecipes = this.recipesService.getRecipes();
        
        if (localRecipes.length === 0)
            return this.dataStorageService.getRecipes();
        else
            return localRecipes;
    }
}