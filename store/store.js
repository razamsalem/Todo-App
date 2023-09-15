const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_FILTER = 'SET_FILTER'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'

/* 
 Store should manage:
  a. List of todos V
  b. current FilterBy X
  c. User object X
 */

const initialState = {
    todos: [],
    filter: 'all',
    searchQuery: '',
}

function appReducer(state = initialState, action) {
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

        default:
            return state

    }
}

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : () => { }


export const store = createStore(appReducer, middleware)

window.gStore = store