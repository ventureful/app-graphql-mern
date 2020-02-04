import React, {useContext} from "react";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import TextField from "@atlaskit/textfield";
import Button, {ButtonGroup} from "@atlaskit/button";
import Form, {Field, FormFooter, ErrorMessage, ValidMessage} from "@atlaskit/form";
import {toast} from "react-toastify";
import {User} from "../types";
import {AuthContext} from "../context/AuthContext";

const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        id
        name
        token
      }
    }
`;

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

            toast.success('Вы вошли в систему', {
                autoClose: 3000
            })
        } catch (e) {
            toast.error(`${e.message}`, {
                autoClose: 3000
            })
        }
    };

    return (
        <>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                {({formProps, submitting}) => (
                    <form {...formProps}>
                        <Field name="email" label="Email" defaultValue={''} isRequired
                               validate={(value: any) =>
                                   !value.includes('@') ? 'TOO_SHORT' : undefined
                               }
                        >
                            {({fieldProps, error, valid}) => (
                                <>
                                    <TextField {...fieldProps} />
                                    {error && (
                                        <ErrorMessage>
                                            Must contain @ symbol
                                        </ErrorMessage>
                                    )}
                                    {!error && valid && (
                                        <ValidMessage>
                                            Nice one, this email is available
                                        </ValidMessage>
                                    )}
                                </>
                            )}
                        </Field>
                        <Field
                            name="password"
                            label="Password"
                            defaultValue={''}
                            isRequired
                            validate={(value: string | undefined) =>
                                value && value.length < 6 ? 'TOO_SHORT' : undefined
                            }
                        >
                            {({fieldProps, error, valid}) => (
                                <>
                                    <TextField type="password" {...fieldProps} />
                                    {error && (
                                        <ErrorMessage>
                                            Password needs to be more than 6 characters.
                                        </ErrorMessage>
                                    )}
                                    {!error && valid && (
                                        <ValidMessage>Good password</ValidMessage>
                                    )}
                                </>
                            )}
                        </Field>
                        <FormFooter>
                            <ButtonGroup>
                                <Button type="submit" appearance="primary" isLoading={submitting}>
                                    Login
                                </Button>
                            </ButtonGroup>
                        </FormFooter>
                    </form>
                )}
            </Form>
        </>
    );
};
