import { userService } from "../services/user.service.js"

const { createStore, compose } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

export const SET_FILTER = 'SET_FILTER'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'
export const SET_USER_PREFERENCES = 'SET_USER_PREFERENCES'

/* 
 Store should manage:
  a. List of todos V
  b. current FilterBy V
  c. User object X
 */

const initialState = {
    todos: [],
    filter: 'all',
    searchQuery: '',
    loggedinUser: userService.getLoggedinUser()
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

        //User
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        case SET_USER_BALANCE:
            const user = { ...state.loggedinUser, balance: action.balance }
            return { ...state, loggedinUser: user }

        case SET_USER_PREFERENCES:
            const updatedUser = { ...state.loggedinUser, prefs: action.prefs }
            return { ...state, loggedinUser: updatedUser }
            
        default:
            return state

    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())

window.gStore = store