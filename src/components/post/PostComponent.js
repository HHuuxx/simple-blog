import React, { useContext, useRef, useState } from 'react'
import { Col, Form, IconButton, Input, Panel, Row, Tag, TagGroup, Schema } from 'rsuite'
import { faTrash, faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TimelineContext } from '../../layout/Timeline/Provider';
import cls from "./PostComponent.module.scss"
import { Textarea } from '../BasicComponents';
import Alert from '../Alert';


const model = Schema.Model({
    title: Schema.Types.StringType().isRequired('Title is Required'),
    content: Schema.Types.StringType().isRequired('Content is Required')
});


export default function PostComponent({
    id,
    title,
    content,
    dateCreated
}) {
    const initialValue = {
        id,
        title,
        content,
        dateCreated,
    }
    const [isEditing, setIsEditing] = useState(false)
    const { dispatch } = useContext(TimelineContext)
    const formRef = useRef()

    const [formValue, setFormValue] = React.useState({
        id,
        title,
        content,
        dateCreated
    });

    const [open, setOpen] = useState(false)

    const handleRemove = () => {
        dispatch({
            type: "REMOVE_POST",
            payload: id
        })
        setOpen(false)
    }
    const handleContentEdit = () => {
        if (formRef.current.check()) {
            dispatch({
                type: "UDPATE_POST",
                payload: formValue
            })
            setOpen(false)

            setTimeout(() => {
                setFormValue(initialValue)
            }, 500)
            setIsEditing(false)
        }
    }

    const handleEdit = () => {
        setIsEditing(true)
        if (isEditing) {
            handleContentEdit()
        }
    }



    const alertProps = {
        open,
        onCancel: () => setOpen(false),
        onClose: () => setOpen(false),
        onSubmit: () => handleRemove()
    }


    const actionButtons = (<>
        <IconButton className={cls.btnDelete} color="red" appearance="primary"
            onClick={() => setOpen(true)}
            icon={<FontAwesomeIcon color="white" icon={faTrash} />} />
        <IconButton type={isEditing ? "submit" : "button"} className={cls.btnEdit} color="blue" appearance="primary"
            icon={<FontAwesomeIcon color="white" icon={isEditing ? faCheckCircle : faEdit} />}
            onClick={() => handleEdit()} />
    </>)

    if (isEditing) {
        return (
            <Form
                fluid
                ref={formRef}
                onChange={setFormValue}
                formValue={formValue}
                model={model}
                checkTrigger="blur"
            >
                <Alert {...alertProps} />

                <Panel header={<div style={{ display: "flex" }}>
                    <Form.Group>
                        <Form.Control name="title" />
                    </Form.Group>
                </div>}>
                    <Form.Control
                        accepter={Textarea}
                        rows={10}
                        name="content"
                    />
                </Panel>
                <Row>
                    <Col xs="21" />
                    <Col xs="3">
                        {actionButtons}
                    </Col>
                </Row>
            </Form>)

    }

    return (
        <Panel header={<Row>
            <Col xs={21}>{`${title}`}</Col>
            <Col xs={3}>{actionButtons}</Col>
        </Row>}>
            <Alert {...alertProps} />
            <div className={cls.contentContainer}>{content}</div>
            <TagGroup className={cls.dateTag}>
                <Tag color="blue">{dateCreated}</Tag>
            </TagGroup>
        </Panel>
    )


}
