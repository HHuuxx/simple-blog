import moment from 'moment';
import React, { useContext, useEffect, useRef } from 'react'
import { Modal, Schema, Button, ButtonToolbar, Input, Form } from 'rsuite'
import { TimelineContext } from '../../layout/Timeline/Provider';

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


const model = Schema.Model({
    title: Schema.Types.StringType().isRequired('Title is Required').minLength(1),
    content: Schema.Types.StringType().isRequired('Content is Required').minLength(1)
});
const uniqueId = (length = 16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
}

const texts = {
    ButtonTitle: "Create New Post",
    ModalHeader: "New Post",
}

export default function PostEditor() {
    const initialValue = {
        id: uniqueId(),
        title: '',
        content: '',
        dateCreated: moment().format('MMMM Do YYYY, h:mm a'),
    }

    const formRef = useRef()
    const [open, setOpen] = React.useState(false);
    const [formValue, setFormValue] = React.useState(initialValue);

    const { dispatch } = useContext(TimelineContext)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {
        if (formRef.current.check()) {
            dispatch({
                type: "ADD_POST",
                payload: formValue
            })
            handleClose(true)

            setTimeout(() => {
                setFormValue(initialValue)
            }, 500)
        }
    }

    return (
        <div className="modal-container">
            <ButtonToolbar>
                <Button onClick={handleOpen}>{texts.ButtonTitle}</Button>
            </ButtonToolbar>

            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>{texts.ModalHeader}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form fluid
                        ref={formRef}
                        onChange={setFormValue}
                        formValue={formValue}
                        model={model}
                        checkTrigger="blur"
                    >
                        <Form.Group>
                            <Form.ControlLabel>
                                Title
                            </Form.ControlLabel>
                            <Form.Control
                                name="title"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.ControlLabel>
                                Content
                            </Form.ControlLabel>
                            <Form.Control
                                accepter={Textarea}
                                rows={10}
                                name="content"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.ControlLabel>
                                Date
                            </Form.ControlLabel>
                            <Form.Control
                                plaintext="true"
                                type="dateCreated"
                                name="dateCreated"
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button type="submit" onClick={handleSubmit} appearance="primary">
                                Ok
                            </Button>
                            <Button onClick={handleClose} appearance="subtle">
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Form>

                </Modal.Body>

            </Modal>
        </div>
    );
}