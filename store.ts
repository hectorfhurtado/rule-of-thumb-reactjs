import { configureStore } from "@reduxjs/toolkit"
import { reducer as pollReducer } from "./slices/poll"

export const store = configureStore({
    reducer:
    {
        poll: pollReducer,
    },
})
