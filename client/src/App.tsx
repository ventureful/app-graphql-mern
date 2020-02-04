import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {Routes} from "./Routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navigation} from "./components/Navigation";


const App = () => {
    const {login, logout, user, token, name} = useAuth();

    const isAuth = !!token;

    const routes = Routes(isAuth);

    return (
        <AuthContext.Provider value={{
            logout, login, token, user, isAuth, name
        }}>
            <ToastContainer/>
            {isAuth && <Navigation/>}
            <Router>
                {routes}
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
