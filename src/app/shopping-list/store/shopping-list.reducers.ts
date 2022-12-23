import { Ingredient } from "src/app/shared/ingredients.model";
import * as ShoppingListAction from "./shopping-list.actions"


export interface State{
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;    
}

const initialState: State = {
    ingredients: [],
    editedIngredient: null,
    editedIngredientIndex: -1
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
            const ingredient= state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            }
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            
            return {
                ...state,
                ingredients: updatedIngredients
            }
        case ShoppingListAction.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((i, index) => index !== state.editedIngredientIndex)
            }
        case ShoppingListAction.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            }
        case ShoppingListAction.STOP_EDIT:

            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredien: null
            }
        default:
            return state;
    }
}