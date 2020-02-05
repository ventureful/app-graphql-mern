import React, {useContext} from "react";
import {useMutation} from "@apollo/react-hooks";
import TextField from "@atlaskit/textfield";
import {Button} from "antd";
import Form, {Field, FormFooter, HelperMessage} from "@atlaskit/form";
import {message} from 'antd'
import {User} from "../types";
import {AuthContext} from "../context/AuthContext";
import {LOGIN_USER} from "../graphql/mutations";

export const Login: React.FC = () => {
    const [loginUser] = useMutation(LOGIN_USER);
    const {login} = useContext(AuthContext);

    const handleSubmit = async (user: User) => {
        try {
            const data = await loginUser({
                variables: {...user}
            });

            const {id, name, token} = data.data.loginUser;

            login(token, id, name);

            message.success(`Добро пожаловать ${name}`)
        } catch (e) {
            message.error(e.message)
        }
    };

    return (
        <>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                {({formProps, submitting}) => (
                    <form {...formProps}>
                        <Field name="email" label="Email" defaultValue={''} isRequired
                        >
                            {({fieldProps}) => (
                                <>
                                    <TextField {...fieldProps} />
                                    {(
                                        <HelperMessage>
                                            Must contain @ symbol
                                        </HelperMessage>
                                    )}
                                </>
                            )}
                        </Field>
                        <Field
                            name="password"
                            label="Password"
                            defaultValue={''}
                            isRequired
                        >
                            {({fieldProps}) => (
                                <>
                                    <TextField type="password" {...fieldProps} />
                                    {(
                                        <HelperMessage>
                                            Password needs to be more than 6 characters.
                                        </HelperMessage>
                                    )}
                                </>
                            )}
                        </Field>
                        <FormFooter>
                            <Button type="primary" htmlType={'submit'} disabled={submitting}>
                                Login
                            </Button>
                        </FormFooter>
                    </form>
                )}
            </Form>
        </>
    );
};
