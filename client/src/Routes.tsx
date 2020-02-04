import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {HomePage} from "./pages/HomePage";

export const Routes = (isAuth: boolean) => {
    if (isAuth) {
        return (
            <Switch>
                <Route exact path={'/home'} component={HomePage}/>
                <Redirect to={'/home'}/>
            </Switch>
        );
    }

    return (
        <Switch>
            <Route exact path={'/'} component={AuthPage}/>
            <Redirect to={'/'}/>
        </Switch>
    )
};
