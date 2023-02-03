import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.models";
import * as RecipeActions from "./recipe.actions";

export interface State{
    recipes: Recipe[];
}

export const initialState: State = {
   recipes: []
}

export const recipesReducer = createReducer(
    initialState,
    on(RecipeActions.setRecipes, (state, action) => 
    {
        return {
            ...state,
            recipes: [...action.recipes]
           }
    }),

    on(RecipeActions.addRecipe, (state, action) => 
    {
        return {
            ...state,
            recipes: [...state.recipes, action]
           }
    }),

    on(RecipeActions.updateRecipe, (state, action) => 
    {
        const updateRecipe = {
            ...state.recipes[action.payload.index],
            ...action.payload.newRecipe
        };
        const updatedRecipes =  [...state.recipes];
        updatedRecipes[action.payload.index] = updateRecipe;
        return {
            ...state,
            recipes: updatedRecipes
        };
    }),

    on(RecipeActions.deleteRecipe, (state, action) => 
    {
        return{
            ...state,
            recipes: state.recipes.filter((r,index ) => index !== action.payload)
        };
    }),
);
