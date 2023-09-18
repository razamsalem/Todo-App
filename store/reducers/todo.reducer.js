export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_FILTER = 'SET_FILTER'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    todos: [],
    filter: 'all',
    searchQuery: '',
    isLoading: false
}

export function todoReducer(state = initialState, action = {}) {
    let todos

    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }

        case REMOVE_TODO:
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }

        case ADD_TODO:
            todos = [...state.todos, action.todo]
            return { ...state, todos }

        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }

        //Filter
        case SET_FILTER:
            return { ...state, filter: action.newFilter }

        case SET_SEARCH_QUERY:
            return { ...state, searchQuery: action.searchQuery }

        //Todo general
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading}

        default:
            return state
    }

}