import { Action, createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredients.model";


export const addIngredient = createAction(
    '[ShoppingList] ADD_INGREDIENT',
     props<Ingredient>()
    );
    
export const addIngredients = createAction(
    '[ShoppingList] ADD_INGREDIENTS',
     props<{ingredients: Ingredient[]}>()
    );

export const deleteIngredients = createAction(
    '[ShoppingList] DELETE_INGREDIENTS'
    );

export const updateIngredient = createAction(
    '[ShoppingList] UPDATE_INGREDIENT',
     props<Ingredient>()
    );

export const startEdit = createAction(
    '[ShoppingList] [ShoppingList] START_EDIT',
     props<{index: number}>()
    );

export const stopEdit = createAction(
    '[ShoppingList] STOP_EDIT',
    );
