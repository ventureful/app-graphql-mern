import React, {useState} from "react";
import {Row, Col, Button} from "antd";
import {Login} from "../components/Login";
import {Register} from "../components/Register";

export const AuthPage: React.FC = () => {
    const [toggle, setToggle] = useState<boolean>(true)

    return (
        <Row style={{marginTop: 120}}>
            <Col span={22}>
            {toggle
                    ? <Login/>
                    : <Register/>
                }
                <Button
                    type={'danger'}
                    size={'small'}
                    onClick={() => setToggle(prevState => prevState = !prevState)}
                    style={{
                        margin: '1rem'
                    }}
                >
                    {toggle
                        ? 'Загегистрируйтесь! '
                        : 'Нажмите если есть аккаунт!'
                    }
                </Button>
            </Col>
        </Row>
    );
};
