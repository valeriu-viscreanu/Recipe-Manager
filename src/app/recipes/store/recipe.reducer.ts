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
    default: return state;
    }
}
