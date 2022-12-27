import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.models";

export const SET_RECIPES = 'SET_RECIPES'
export const FETCH_RECIPES = 'FETCH_RECIPES'
export const STORE_RECIPE = 'STORE_RECIPE'
export const ADD_RECIPE = 'ADD_RECIPES'
export const UPDATE_RECIPE = 'UPDATE_RECIPES'
export const DELETE_RECIPE = 'DELETE_RECIPES'

export class SetRecipes implements Action{
    readonly type = SET_RECIPES;
    constructor(public payload: Recipe[]){
    }
}

export class FetchRecipes implements Action{
    readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action{
    readonly type = STORE_RECIPE;
}

export class AddRecipe implements Action{
    readonly type = ADD_RECIPE;
    constructor(public payload: Recipe){
    }
}

export class UpdateRecipe implements Action{
    readonly type = UPDATE_RECIPE;
    constructor(public payload: {index: number, newRecipe: Recipe}){
    }
}

export class DeleteRecipe implements Action{
    readonly type = DELETE_RECIPE;
    constructor(public payload: number){
    }
}

export type RecipeActions = SetRecipes | FetchRecipes | AddRecipe | UpdateRecipe | DeleteRecipe | StoreRecipes;