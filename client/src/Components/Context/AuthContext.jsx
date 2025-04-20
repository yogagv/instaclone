import { createContext, useEffect, useReducer } from "react"



const initialState = {

    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
    error: null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    role: localStorage.getItem('role') ? localStorage.getItem('role') : null

}

export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {

    switch(action.type) {

        case 'LOGIN_START':
        return {
            user: null,
            token: null,
            role: null,
            loading: false,
            error: null
        }

        case 'LOGIN_SUCCESS':
            return {
                user:action.payload,
                token:action.token,
                role:action.role,
                loading:false,
                error: null
            }

        case 'LOGIN_FAILURE' : 
        return {
            user:null,
            token:null,
            role:null,
            loading:false,
            error:action.payload
        }
        
        case 'LOGOUT':
        return {
            
            user:null,
            token:null,
            role:null,
            loading:false,
            error:null
        }

        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {

const [state, dispatch] = useReducer(AuthReducer, initialState)

useEffect(() => {

    localStorage.setItem('user',JSON.stringify(state.user));
    localStorage.setItem('token', state.token);
    localStorage.setItem('role', state.role);

    if(!state.user) localStorage.removeItem('user');
    if(!state.token) localStorage.removeItem('token');
    if(!state.role) localStorage.removeItem('role');

},[state])

return (

    <AuthContext.Provider

        value= {{

            user: state.user,
            token: state.token,
            role: state.role,
            loading: state.loading,
            error: state.error,
            dispatch

        }}>       
         {children}
    </AuthContext.Provider>
)
}