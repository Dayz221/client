import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../utils/axios.js"

const initialState = {
    isLoading: false,
    todos: []
}

export const getTodos = createAsyncThunk(
    'todos/getTodos',
    async (_, { dispatch }) => {
        const response = await axios.get('/getTasks')
        dispatch(setTodosAction(response.data.tasks))
    }
)

export const addTodo = createAsyncThunk(
    'todos/addTodo',
    async (task, { dispatch }) => {
        const response = await axios.post('/newTask', task)
        dispatch(addTodoAction(response.data))
    }
)

export const patchTodo = createAsyncThunk(
    'todos/patchTodo',
    async ({id, task}, { dispatch }) => {
        const response = await axios.patch(`/patchTask/${id}`, task)
        dispatch(patchTodoAction(response.data))
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id, { dispatch }) => {
        await axios.delete(`/deleteTask/${id}`)
        dispatch(deleteTodoAction(id))
    }
)

export const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodosAction: (state, action) => {
            state.todos = action.payload
        },
        addTodoAction: (state, action) => {
            state.todos.push(action.payload)
        },
        patchTodoAction: (state, action) => {
            const localId = state.todos.findIndex(el=> el._id == action.payload._id)
            state.todos[localId] = action.payload
        },
        deleteTodoAction: (state, action) => {
            state.todos = state.todos.filter(el => el._id != action.payload)
        }
    },
    extraReducers: (builder) => {
        // get todos
        builder.addCase(getTodos.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getTodos.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(getTodos.rejected, (state) => {
            state.isLoading = false
        })

        // add todo
        builder.addCase(addTodo.pending, () => {})
        builder.addCase(addTodo.fulfilled, () => {})
        builder.addCase(addTodo.rejected, () => {})

        // patch todo
        builder.addCase(patchTodo.pending, () => {})
        builder.addCase(patchTodo.fulfilled, () => {})
        builder.addCase(patchTodo.rejected, () => {})

        // delete todo
        builder.addCase(deleteTodo.pending, () => {})
        builder.addCase(deleteTodo.fulfilled, () => {})
        builder.addCase(deleteTodo.rejected, () => {})
    }
})

export const { setTodosAction, addTodoAction, deleteTodoAction, patchTodoAction } = todosSlice.actions
export default todosSlice.reducer