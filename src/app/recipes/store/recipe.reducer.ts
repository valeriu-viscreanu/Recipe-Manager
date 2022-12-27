import { Recipe } from "../recipe.models";
import * as RecipeActions from "./recipe.actions";

export interface State{
    recipes: Recipe[];
}

export const initialState: State = {
   recipes: []
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions){
    switch (action.type){
        case RecipeActions.SET_RECIPES:
            return {
                     ...state,
                     recipes: [...action.payload]
                    }
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload ] 
            };
        case RecipeActions.UPDATE_RECIPE:
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
        case RecipeActions.DELETE_RECIPE: 
            return{
                ...state,
                recipes: state.recipes.filter((r,index ) => index !== action.payload)
            };

        default: return state;
        }
}
