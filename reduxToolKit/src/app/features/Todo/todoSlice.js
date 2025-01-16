/* eslint-disable no-unused-vars */
import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: []
    },
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                content: action.payload,
            }
            // we are pushing the todo to our initial state
            state.todos.push(todo);
        },
        deleteTodo: (state, action) => { 
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        updateTodo: (state, action) => { 
            state.todos = state.todos.map(todo => {
                if(todo.id === action.payload) {
                    todo.content = action.payload;
                }
            })
        },
        toggleComplete: (state, action) => { 
            state.todos = state.todos.map(todo => {
                if(todo.id === action.payload) {
                    todo.completed = !todo.completed;
                }
            })
        }
    }
})

// Ye export hume components me kam aaega
export const {addTodo, deleteTodo, updateTodo, toggleComplete} = todoSlice.actions;

// ye export store ko in reducers ke bare me jankari dene me kam aaega
export default todoSlice.reducer
