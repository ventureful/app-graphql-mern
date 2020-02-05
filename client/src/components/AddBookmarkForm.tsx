import React, {useState} from "react";
import {Button} from "antd";
import Textfield from "@atlaskit/textfield";
import ModalDialog, {
    ModalFooter,
    ModalTransition,
} from "@atlaskit/modal-dialog";
import Form, {Field, ErrorMessage, ValidMessage} from "@atlaskit/form";

interface AddBookmarkFormProps {
    addBookmark: Function
}

export const AddBookmarkForm: React.FC<AddBookmarkFormProps> = ({addBookmark}) => {
    const [show, setShow] = useState<boolean>(false);

    const footer = () => (
        <ModalFooter showKeyline={show}>
            <span/>
            <Button type="primary" htmlType="submit">
                Add Bookmark
            </Button>
        </ModalFooter>
    );

    const handleSubmit = <T extends any>({url}: T) => {
        addBookmark(url);
        setShow(false)
    };

    return (
        <>
            <Button type="primary" onClick={() => setShow(true)} style={{marginBottom: '1rem'}}>Add Bookmark</Button>

            <ModalTransition>
                {show && (
                    <ModalDialog
                        heading="Add New Bookmark"
                        onClose={() => setShow(false)}
                        components={{
                            Container: ({children, className}) => (
                                <Form onSubmit={handleSubmit}>
                                    {({formProps}) => (
                                        <form {...formProps} className={className}>
                                            {children}
                                        </form>
                                    )}
                                </Form>
                            ),
                            Footer: footer
                        }}
                    >
                        <p>Enter text, then submit the form to add a new bookmark</p>
                        <Field label="Url" name="url" defaultValue=""
                               isRequired
                               validate={(value: string | undefined) =>
                                   value && value.length < 6 ? 'TOO_SHORT' : undefined
                               }
                        >
                            {({fieldProps, error, valid}) => (
                                <>
                                    <Textfield {...fieldProps} />
                                    {error === 'TOO_SHORT' && (
                                        <ErrorMessage>
                                            Invalid url, needs to be more than 6 characters
                                        </ErrorMessage>
                                    )}
                                    {valid && (
                                        <ValidMessage>
                                            It's ok
                                        </ValidMessage>
                                    )}
                                </>
                            )}
                        </Field>
                    </ModalDialog>
                )}
            </ModalTransition>
        </>
    );
};
