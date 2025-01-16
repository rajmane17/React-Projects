import {configureStore} from "@reduxjs/toolkit"
import todoReducer from "./features/Todo/todoSlice.js"

export const Store = configureStore({
    // reducers info will be added over here
    reducer: todoReducer
})