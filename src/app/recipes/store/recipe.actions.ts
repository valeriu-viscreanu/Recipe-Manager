import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.models";

export const SET_RECIPES = 'SET_RECIPES'


export class SetRecipes implements Action{
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]){
    }
}

export type RecipeActions = SetRecipes