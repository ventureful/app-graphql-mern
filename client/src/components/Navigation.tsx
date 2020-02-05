import React, {useContext, useState} from "react";
import {message, Layout, Menu, Button} from "antd";
import ModalDialog, {
    ModalTransition,
} from "@atlaskit/modal-dialog";
import {AuthContext} from "../context/AuthContext";

export const Navigation: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const {logout, name} = useContext(AuthContext);

    const {Header} = Layout;

    return (
        <Header>
            <div className="logo"><h3 style={{color: '#fff'}}>{name}</h3></div>
            <Menu
                theme="dark"
                mode="horizontal"
                style={{lineHeight: '64px'}}
            >
                <Menu.Item onClick={() => setShow(true)} style={{
                    position: 'absolute', right: '.5rem'
                }}>Logout</Menu.Item>
            </Menu>
            <ModalTransition>
                {show && (
                    <ModalDialog
                        heading="Are you sure ?"
                        onClose={() => setShow(false)}
                        components={{
                            Container: ({children, className}) => (
                                <>{children}</>
                            )
                        }}
                    >
                        <p>Enter text, then submit the form to add a new bookmark</p>
                        <p>Enter text, then submit the form to add a new bookmark</p>
                        <Button style={{marginBottom: '.5rem', marginRight: '1rem'}}
                                onClick={() => {
                                    logout();
                                    message.info('Вы вышли из системы')
                                }}
                        >
                            Yes
                        </Button>
                        <Button type={'danger'} style={{marginBottom: '.5rem'}}
                                onClick={() => setShow(false)}
                        >
                            No
                        </Button>
                    </ModalDialog>
                )}
            </ModalTransition>
        </Header>
    );
};
