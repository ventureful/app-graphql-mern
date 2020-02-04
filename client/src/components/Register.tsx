import React from "react";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import TextField from "@atlaskit/textfield";
import Button, {ButtonGroup} from "@atlaskit/button";
import Form, {Field, FormFooter, ErrorMessage, ValidMessage} from "@atlaskit/form";
import {toast} from "react-toastify";
import {User} from "../types";

const REGISTER_USER = gql`
    mutation registerUser($name: String!, $email: String!, $password: String!) {
      registerUser(name: $name, email: $email, password: $password) {
        name
        email
        password
      }
    }
`;

export const Register: React.FC = () => {
    const [registerUser] = useMutation(REGISTER_USER);

    const handleSubmit = async (user: User) => {
        try {
            await registerUser({
                variables: {...user}
            });

            toast.success('Вы зарегистрировались успешно, пожалуйста войдите в аккаунт', {
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
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                {({formProps, submitting}) => (
                    <form {...formProps}>
                        <Field
                            name="name"
                            label="Username"
                            defaultValue=""
                            isRequired
                            validate={(value: string | undefined) =>
                                value && value.length < 5 ? 'TOO_SHORT' : undefined
                            }
                        >
                            {({fieldProps, error, valid}) => (
                                <>
                                    <TextField {...fieldProps} />
                                    {error === 'TOO_SHORT' && (
                                        <ErrorMessage>
                                            Invalid username, needs to be more than 4 characters
                                        </ErrorMessage>
                                    )}
                                    {!error && valid && (
                                        <ValidMessage>
                                            Nice one, this username is available
                                        </ValidMessage>
                                    )}
                                </>
                            )}
                        </Field>
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
                                    Register
                                </Button>
                            </ButtonGroup>
                        </FormFooter>
                    </form>
                )}
            </Form>
        </>
    );
};
