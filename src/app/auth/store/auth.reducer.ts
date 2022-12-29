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
        case AuthActions.AUTHENTICATE_SUCCESS:
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
        case AuthActions.AUTHENTICATE_FAIL:
            return {
                ...state,
                authError: action.payload,
                user: null,                
                loading: false
            }
        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,             
                loading: true
            }
        default: return state
    }
}