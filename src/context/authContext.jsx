import { createContext, useContext, useEffect, useReducer } from "react"
import AuthReducer from "./authReducer"

const INITIAL_STATE = {
    user: null,
    isFetching:false,
    error:false
}

/* Reads the data from the Provider and changes INITIAL_STATE */
export const AuthContext = createContext(INITIAL_STATE)
export const useAuth = () => useContext(AuthContext);

/* Children here are the Components that need to get the data.[In this Application we specified App COmponent as Child in index.js so that we can server every every component exist in the app */
/* This will provide data to all the children that we are giving here */
export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
        value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}