import React, { useContext, useEffect, useState } from 'react'
import { PanelGroup, IconButton, Pagination } from 'rsuite'
import PostComponent from "../../components/post/PostComponent"
import PostEditor from '../../components/post/PostEditor'
import cls from "./index.module.scss"
import { TimelineContext } from './Provider'

function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}


export default function Timeline() {

    const { state } = useContext(TimelineContext)
    const [paginationOptions, setPaginationOptions] = useState({
        activePage: 1,
        recordCount: 0,
        dataPerPage: 2,
    })


    const onPaginationPageChange = (page) => {
        setPaginationOptions({
            ...paginationOptions,
            activePage: page
        })
    }
    const getPosts = () => {
        return paginate(state.posts, paginationOptions.dataPerPage, paginationOptions.activePage).map((post) => {
            return <PostComponent key={post.id} {...post} />
        })
    }

    useEffect(() => {
        setPaginationOptions({
            ...paginationOptions,
            recordCount: state.posts.length
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.posts])

    console.log(paginate(state.posts, paginationOptions.dataPerPage, paginationOptions.activePage))

    return (
        <div>
            <h1 className={cls.moduleTitle}>Allen's Blog</h1>
            <PostEditor />
            <PanelGroup>
                {getPosts()}
            </PanelGroup>
            <div className={cls.paginationContainer}>
                <Pagination
                    prev
                    last
                    next
                    first
                    size="lg"
                    total={paginationOptions.recordCount}
                    limit={paginationOptions.dataPerPage}
                    activePage={paginationOptions.activePage}
                    onChangePage={onPaginationPageChange}
                />
            </div>
        </div>
    )
}
