import {useCallback, useEffect, useState} from "react";

const storageName = 'User';

export const useAuth = () => {
    const [token, setToken] = useState<null | string>(null);
    const [user, setUser] = useState<null | string>(null);
    const [name, setName] = useState<null | string>(null);

    const login = useCallback( (jwtToken: string, userId: string, name: string) => {
        setToken(jwtToken);
        setUser(userId);
        setName(name);

        localStorage.setItem(storageName, JSON.stringify({
            jwtToken, userId, name
        }))
    }, []);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem(storageName)
    };

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName) as any);
        if (data && data.jwtToken) {
            login(data.jwtToken, data.userId, data.name)
        }
    }, [login]);

    return {login, logout, token, user, name}
};
