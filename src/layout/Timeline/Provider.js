import React, { createContext, useReducer } from 'react'


export const TimelineContext = createContext({})

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_POST": {
            const posts = [...state.posts, { ...action.payload }]

            return {
                ...state,
                posts
            }
        }
        case "REMOVE_POST": {
            let posts = [
                ...state.posts,
            ]

            posts = posts.filter((value) => {
                return value.id !== action.payload
            })

            return {
                ...state,
                posts
            }
        }

        case "UDPATE_POST": {
            console.log(action.payload)
            let posts = [
                ...state.posts,
            ]

            console.log(posts.findIndex(post => post.id === action.payload.id))

            return {
                ...state,
                posts
            }
        }
        default: {
            return { ...state }
        }
    }
}
const initialValue = {
    posts: [],

}
export default function TimelineProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialValue)
    const payload = {
        state,
        dispatch
    }
    return (
        <TimelineContext.Provider value={payload}>
            {children}
        </TimelineContext.Provider>
    )
}
