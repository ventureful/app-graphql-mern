import {createContext} from "react"

interface AuthContext {
    name: null | string
    token: null | string
    user: null | string
    login: Function
    logout: Function
    isAuth: boolean
}

function noop() {
}

export const AuthContext = createContext<AuthContext>({
    name: null,
    token: null,
    user: null,
    login: noop,
    logout: noop,
    isAuth: false
});
