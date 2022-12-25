import * as AuthActions from "./auth.actions";
import { User } from "../user.model";

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

export function authReducer(state = initialState, action: AuthActions.AuthActions){
    switch (action.type){
        case AuthActions.LOGIN:
            debugger
            const user = new User(
                action.payload.email,
                action.payload.userId,
                action.payload.token,
                action.payload.expirationDate,
            );
           
        return{
            ...state,
            authError: null,
            user: user,
            loading: false
        }
        case AuthActions.LOGOUT:
            return{
                ...state,
                user: null,                
              loading: false
            }
        case AuthActions.LOGIN_FAIL:
            debugger
            return {
                ...state,
                authError: action.payload,
                user: null,                
                loading: false
            }
        case AuthActions.LOGIN_START:
            debugger
            return {
                ...state,             
                loading: true
            }
        default: return state
    }
}