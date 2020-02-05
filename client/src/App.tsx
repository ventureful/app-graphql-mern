import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {Layout} from "antd";
import {Routes} from "./Routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navigation} from "./components/Navigation";


const App = () => {
    const {login, logout, user, token, name} = useAuth();

    const isAuth = !!token;

    const routes = Routes(isAuth);

    const {Content} = Layout;

    return (
        <AuthContext.Provider value={{
            logout, login, token, user, isAuth, name
        }}>
            <Layout style={{width: '100%'}}>
                {isAuth && <Navigation/>}
                <Layout>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Router>
                            {routes}
                        </Router>
                    </Content>
                </Layout>
            </Layout>
        </AuthContext.Provider>
    );
};

export default App;
