import React from "react";
import {useMutation} from "@apollo/react-hooks";
import {Button} from "antd";
import TextField from "@atlaskit/textfield";
import Form, {Field, FormFooter, ErrorMessage, ValidMessage} from "@atlaskit/form";
import {message} from 'antd'
import {User} from "../types";
import {REGISTER_USER} from "../graphql/mutations";

export const Register: React.FC = () => {
    const [registerUser] = useMutation(REGISTER_USER);

    const handleSubmit = async (user: User) => {
        try {
            await registerUser({
                variables: {...user}
            });

            message.success('Вы зарегистрировались успешно, пожалуйста войдите в аккаунт');

            user.name = '';
            user.email = '';
            user.password = ''
        } catch (e) {
            message.error(e.message)
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
                                <Button type="primary" htmlType={'submit'} disabled={submitting}>
                                    Register
                                </Button>
                        </FormFooter>
                    </form>
                )}
            </Form>
        </>
    );
};
