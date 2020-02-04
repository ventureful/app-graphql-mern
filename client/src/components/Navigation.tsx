import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {toast} from "react-toastify";

export const Navigation: React.FC = () => {
    const {name, logout} = useContext(AuthContext);

    return (
        <div>
            <h1>{name}</h1>
            <button onClick={() => {
                logout();
                toast.info('Вы вышли из систему', {
                    autoClose: 3000
                })
            }}>Logout</button>
        </div>
    );
};
