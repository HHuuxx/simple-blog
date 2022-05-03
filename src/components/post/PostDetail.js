import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { TimelineContext } from '../../layout/Timeline/Provider'
import PostComponent from './PostComponent'

const getArrayValueByKey = (params) => {
    const { Key, Value, List } = params;

    return List?.find((item) => {
        return item[Key] == Value;
    });
};

export default function PostDetail() {
    const postID = parseInt(useLocation().pathname.replace("/", ""))
    const { state } = useContext(TimelineContext)


    return (
        <PostComponent  {...getArrayValueByKey({
            List: state.posts,
            Key: "id",
            Value: postID
        })} />
    )
}
