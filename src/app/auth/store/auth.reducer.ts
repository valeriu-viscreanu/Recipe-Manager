import * as AuthActions from "./auth.actions";
import { User } from "../user.model";
import { createReducer, on } from "@ngrx/store";

export interface State {
    user: User;
    authError: string;
    loading: boolean;
} 

export const initialState: State = {
    user: null,
    authError: null,
    loading: false
};



export const authReducer = createReducer(
    initialState,
    on(AuthActions.authenticateSuccess, (state, action) => 
    {
               const user = new User(
                action.email,
                action.userId,
                action.token,
                action.expirationDate,
            );
           
        return{
            ...state,
            authError: null,
            user: user,
            loading: false
        }
    }),

    on(AuthActions.logout, (state, action) => 
    {
        return{
            ...state,
            user: null,                
          loading: false
        }
    }),

    on(AuthActions.authenticateFail, (state, action) => 
    {
        return {
            ...state,
            authError: action.message,
            user: null,                
            loading: false
        }
    }),

    
    on(AuthActions.signupStart, AuthActions.loginStart, (state, action) => 
    {
        return {
            ...state,             
            loading: true
        }
    })
);
