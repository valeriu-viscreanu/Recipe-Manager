import { Ingredient } from "src/app/shared/ingredients.model";
import * as ShoppingListAction from "./shopping-list.actions"

const initialState = {
    ingredients: [
        new Ingredient("Salt", 3),
        new Ingredient("Peper", 5)
    ]
};

export function shoppingListReducer(state = initialState, action : ShoppingListAction.ShoppingListActions)
{
    switch(action.type)
    {
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ShoppingListAction.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case ShoppingListAction.UPDATE_INGREDIENT:
            const ingredient= state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            }
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[action.payload.index] = updatedIngredient;
            
            return {
                ...state,
                updatedIngredients: []
            }
        case ShoppingListAction.DELETE_INGREDIENT:

            return {
                ...state,
                ingredients: state.ingredients.filter((i, index) => index !== action.payload)
            }
        default:
            return state;
    }
}