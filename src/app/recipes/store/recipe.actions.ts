import { createAction, props } from "@ngrx/store";
import { Recipe } from "../recipe.models";

export const setRecipes = createAction(
'[Recipe] SET_RECIPES',
 props<{ recipes: Recipe[]}>()
);

export const fetchRecipes = createAction(
'[Recipe] FETCH_RECIPES');

export const storeRecipe = createAction(
'[Recipe] STORE_RECIPE');

export const addRecipe = createAction(
'[Recipe] ADD_RECIPES',
 props<Recipe>());

export const  deleteRecipe = createAction(
'[Recipe] DELETE_RECIPES',
 props<{payload: number}>());

export const  updateRecipe = createAction(
'[Recipe] UPDATE_RECIPES',
    props<{ payload: { index: number, newRecipe: Recipe } }>()
);