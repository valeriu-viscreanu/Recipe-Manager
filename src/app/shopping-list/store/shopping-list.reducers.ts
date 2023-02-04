import { createReducer, on } from "@ngrx/store";
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


export const shoppingListReducer = createReducer(
    initialState,
    on(ShoppingListAction.addIngredient, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, action]
        }
    }),

    on(ShoppingListAction.addIngredients, (state, action) => {
        return {
            ...state,
            ingredients: [...state.ingredients, ...action.ingredients]
        }
    }),

    on(ShoppingListAction.deleteIngredients, (state) => {
        return {
            ...state,
            ingredients: state.ingredients.filter((i, index) => index !== state.editedIngredientIndex)
        }
    }),

    on(ShoppingListAction.updateIngredient, (state, action) => {
        const ingredient = state.ingredients[state.editedIngredientIndex];
        const updatedIngredient = {
            ...ingredient,
            ...action
        }
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

        return {
            ...state,
            ingredients: updatedIngredients
        }

    }),

    on(ShoppingListAction.startEdit, (state, action) => {
        return {
            ...state,
            editedIngredientIndex: action.index,
            editedIngredient: { ...state.ingredients[action.index] }
        }
    }),

    on(ShoppingListAction.stopEdit, (state) => {
        return {
            ...state,
            editedIngredientIndex: -1,
            editedIngredien: null
        }
    })
)