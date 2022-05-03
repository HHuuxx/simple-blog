import React, { useContext, useEffect, useState } from 'react'
import { PanelGroup, IconButton, Pagination, InputPicker, Col, Row, Input } from 'rsuite'
import PostComponent from "../../components/post/PostComponent"
import PostEditor from '../../components/post/PostEditor'
import cls from "./index.module.scss"
import { TimelineContext } from './Provider'

function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

const sortData = [
    {
        value: 1,
        label: "Sort by date"
    },
    {
        value: 2,
        label: "Sort by title"
    }
]

const rowPerPageData = [
    {
        value: 10,
        label: "10 per page"
    },
    {
        value: 20,
        label: "20 per page"
    }
]

export default function Timeline() {

    const { state } = useContext(TimelineContext)
    const [paginationOptions, setPaginationOptions] = useState({
        activePage: 1,
        recordCount: 0,
        dataPerPage: 10,
    })
    const [searchText, setSearchText] = useState("")
    const [order, setOrder] = React.useState();

    const onPaginationPageChange = (page) => {
        setPaginationOptions({
            ...paginationOptions,
            activePage: page
        })
    }
    const getPosts = () => {
        let posts = [...state.posts]
        if (searchText || searchText !== "") {
            posts = posts.filter(post => post.title === searchText)
        }

        switch (order) {
            case 1: {

                return paginate(posts, paginationOptions.dataPerPage, paginationOptions.activePage).sort((a, b) => {
                    return a.dateCreated.localeCompare(b.dateCreated)
                }).map((post) => {
                    return <PostComponent key={post.id} {...post} />
                })
            }
            case 2:

                return paginate(posts, paginationOptions.dataPerPage, paginationOptions.activePage).sort((a, b) => {
                    return a.title.localeCompare(b.title)
                }).map((post) => {
                    return <PostComponent key={post.id} {...post} />
                })
            default: {

                return paginate(posts, paginationOptions.dataPerPage, paginationOptions.activePage).map((post) => {
                    return <PostComponent key={post.id} {...post} />
                })
            }
        }

    }

    useEffect(() => {
        setPaginationOptions({
            ...paginationOptions,
            recordCount: state.posts.length
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.posts])



    return (
        <div>
            <h1 className={cls.moduleTitle}>Allen's Blog</h1>
            <Row>
                <Col xs="24" md="12">
                    <PostEditor />
                </Col>
                <Col xs="24" md="8">
                    <Input placeholder="Search by Title" onChange={(value) => {
                        setSearchText(value)
                    }} />
                </Col>
                <Col xs="24" md="4">
                    <InputPicker data={sortData} onChange={setOrder} />
                </Col>
            </Row>
            <PanelGroup>
                {getPosts()}
            </PanelGroup>
            <div className={cls.paginationContainer}>
                <InputPicker data={rowPerPageData} cleanable={false} onChange={(value) => setPaginationOptions({
                    ...paginationOptions,
                    dataPerPage: value
                })} defaultValue={paginationOptions.dataPerPage} style={{ width: 150 }} />
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
