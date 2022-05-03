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
            let postIndx = posts.findIndex(post => post.id === action.payload.id)

            posts[postIndx] = action.payload


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
    posts: [{
        id: 8284704984600000,
        title: "EU accuses Apple of breaking competition law over contactless payments ",
        content: `
        In a preliminary finding, it said the US company may have broken competition law by preventing rivals from accessing its "tap and go" technology.

        Apple denies the charge and has promised to engage with the Commission.

        If the charges are upheld, it could be fined up to 10% of its global turnover of $36.6bn (£29.2bn) based on its revenue last year.

        "We have indications that Apple restricted third-party access to key technology necessary to develop rival mobile wallet solutions on Apple's devices," EU Vice-President Margrethe Vestager said in a statement.

        "We preliminarily found that Apple may have restricted competition, to the benefit of its own solution Apple Pay," the EU official who is in charge of competition policy said.
`,
        dateCreated: "May 3rd 2022, 1:46 pm"
    }, {
        id: 2132132131,
        title: "Netflix cancels Meghan Markle animated series Pearl",
        content: `
            The show, which was announced last year, is one of several projects being dropped by the streaming giant.

            Last month, Netflix revealed a sharp fall in subscribers and warned millions more are set to quit the service.

            That wiped over $50bn off the company's market value as experts warned it faced a struggle to get back on track.

            Archewell Productions, the company formed by the Duke and Duchess of Sussex, announced last year that Meghan would be an executive producer of Pearl.

            The series was planned to centre on the adventures of a 12-year-old girl, who is inspired by influential women from history.

            Netflix did, however, confirm that it will continue to work on a number of projects with Archewell Productions, including a documentary series called Heart of Invictus.

            The series will focus on athletes competing in the Invictus Games for injured veterans, an event founded by Prince Harry, in The Hague in 2022.

            Archewell Productions did not immediately respond to a BBC request for comment.

            Netflix also said that it had decided not to move forward with two animated children's series Dino Daycare and Boons and Curses.
        `,
        dateCreated: "May 3rd 2022, 2:47 pm"
    }],

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
