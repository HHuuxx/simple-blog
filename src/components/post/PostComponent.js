import React, { useContext, useState } from 'react'
import { Col, IconButton, Input, Panel, Row, Tag, TagGroup } from 'rsuite'
import { faTrash, faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TimelineContext } from '../../layout/Timeline/Provider';
import cls from "./PostComponent.module.scss"


export default function PostComponent({
    id,
    title,
    content,
    dateCreated
}) {
    const [isEditing, setIsEditing] = useState(false)
    const { dispatch } = useContext(TimelineContext)
    const [postTitle, setPostTitle] = useState(title)
    const [postContent, setPostContent] = useState(content)
    const handleRemove = () => {
        dispatch({
            type: "REMOVE_POST",
            payload: id
        })
    }
    const handleContentEdit = () => {
        dispatch({
            type: "UDPATE_POST",
            payload: {
                id,
                title: postTitle,
                content: postContent,
                dateCreated,
            }
        })
    }

    const handleEdit = () => {
        setIsEditing(!isEditing)
        console.log("A")
        if (isEditing) {
            handleContentEdit()
        }
    }


    const actionButtons = (<>
        <IconButton className={cls.btnDelete} color="red" appearance="primary"
            icon={<FontAwesomeIcon color="white" onClick={() => handleRemove()} icon={faTrash} />} />
        <IconButton className={cls.btnEdit} color="blue" appearance="primary"
            icon={<FontAwesomeIcon color="white" onClick={() => handleEdit()} icon={isEditing ? faCheckCircle : faEdit} />} />
    </>)

    if (isEditing) {
        return (<Panel header={<div style={{ display: "flex" }}>
            <Input defaultValue={postTitle} onBlur={(e) => {
                setPostTitle(e.target.value)
            }} />
            {actionButtons}
        </div>}>
            <Input onBlur={(e) => {
                setPostContent(e.target.value)
            }} as="textarea" rows="5" defaultValue={postContent} placeholder="Write something..." />
        </Panel>)

    }

    return (
        <Panel header={<Row>
            <Col xs={21}>{`${postTitle}`}</Col>
            <Col xs={3}>{actionButtons}</Col>
        </Row>}>
            {postContent}
            <TagGroup className={cls.dateTag}>
                <Tag color="blue">{dateCreated}</Tag>
            </TagGroup>
        </Panel>
    )


}
