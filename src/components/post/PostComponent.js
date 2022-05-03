import React, { useContext, useRef, useState } from 'react'
import { Col, Form, IconButton, Input, Panel, Row, Tag, TagGroup, Schema } from 'rsuite'
import { faTrash, faEdit, faCheckCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TimelineContext } from '../../layout/Timeline/Provider';
import cls from "./PostComponent.module.scss"
import { Textarea } from '../BasicComponents';
import Alert from '../Alert';
import { useLocation, useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate()
    const currentPath = useLocation().pathname

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
        navigate("/")
    }

    const handleEdit = () => {
        setIsEditing(true)
        if (isEditing) {
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
    }

    const alertProps = {
        open,
        onCancel: () => setOpen(false),
        onClose: () => setOpen(false),
        onSubmit: () => handleRemove()
    }


    const actionButtons = (<>
        {!isEditing && currentPath !== "/" && <IconButton className={cls.btnDelete} color="red" appearance="primary"
            onClick={() => setOpen(true)}
            icon={<FontAwesomeIcon color="white" icon={faTrash} />} />}
        {currentPath !== "/" && <IconButton type={isEditing ? "submit" : "button"} className={cls.btnEdit} color="blue" appearance="primary"
            icon={<FontAwesomeIcon color="white" icon={isEditing ? faCheckCircle : faEdit} />}
            onClick={() => handleEdit()} />}
        {!isEditing && currentPath === "/" && <IconButton className={cls.btnEdit} color="blue" appearance="primary"
            icon={<FontAwesomeIcon color="white" icon={faEye} />}
            onClick={() => navigate(`/${id}`)} />}
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

                <Panel header={<Row style={{ display: "flex" }}>
                    <Col xs="24" md="20">
                        <Form.Group>
                            <Form.Control name="title" />

                        </Form.Group>
                    </Col>

                    <Col xs="24" md="4" style={{ display: "flex", justifyContent: "right", alignItems: "right" }}>
                        {actionButtons}
                    </Col>
                </Row>}>
                    <Form.Control
                        accepter={Textarea}
                        rows={10}
                        name="content"
                    />
                </Panel>
                <Row>
                    <Col xs="21" />
                    <Col xs="3">

                    </Col>
                </Row>
            </Form>)

    }

    return (
        <Panel header={<Row>
            <Col xs={19}>{`${title}`}</Col>
            <Col xs={5} style={{ display: "flex", justifyContent: "right", alignItems: "right" }}>{actionButtons}</Col>
        </Row>}>
            <Alert {...alertProps} />
            <div className={currentPath === "/" ? cls.textShortened : cls.textExtended}>{content}</div>
            <TagGroup className={cls.dateTag}>
                <Tag color="blue">{dateCreated}</Tag>
            </TagGroup>
        </Panel>
    )


}
