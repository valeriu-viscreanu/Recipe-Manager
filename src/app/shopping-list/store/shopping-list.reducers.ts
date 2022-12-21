import { Ingredient } from "src/app/shared/ingredients.model";
import * as ShoppingListAction from "./shopping-list.actions"

const initialState = {
    ingredients: [
        new Ingredient("Salt", 3),
        new Ingredient("Peper", 5)
    ]
};

export function shoppingListReducer(state = initialState, action : ShoppingListAction.AddIngredient)
{
    switch(action.type)
    {
        case ShoppingListAction.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        default:
            return state;
    }
}