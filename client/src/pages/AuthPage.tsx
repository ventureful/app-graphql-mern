import React, {useState} from "react";
import {Login} from "../components/Login";
import {Register} from "../components/Register";
import {Button} from "@atlaskit/button/dist/esm/components/Button";

export const AuthPage: React.FC = () => {
    const [toggle, setToggle] = useState<boolean>(true)

    return (
        <>
            {toggle
                ? <Login/>
                : <Register/>
            }
            <Button
                appearance={'subtle-link'}
                onClick={() => setToggle(prevState => prevState = !prevState)}
            >
                {toggle
                    ? 'Загегистрируйтесь! '
                    : 'Нажмите если есть аккаунт!'
                }
            </Button>
        </>
    );
};
