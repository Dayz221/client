import {configureStore} from '@reduxjs/toolkit'
import todosSlice from '../features/todos.js'

export const store = configureStore({
    reducer: {
        todos: todosSlice
    }
})