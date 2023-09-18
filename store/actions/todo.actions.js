import { showSuccessMsg } from "../../services/event-bus.service.js";
import { todoService } from "../../services/todo.service.js";
import { SET_TODOS, REMOVE_TODO, SET_IS_LOADING } from "../reducers/todo.reducer.js";
import {store} from "../store.js"

export function loadTodos() {

    store.dispatch({type: SET_IS_LOADING, isLoading: true})
    return todoService.query()
        .then(todos => {
            showSuccessMsg('Todos Reloaded successfully')
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('todo action -> cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({type: SET_IS_LOADING, isLoading: false})
        })
}

export function removeTodo(todoId) {
   return todoService.remove(todoId)
    .then(() => {
        store.dispatch({ type: REMOVE_TODO, todoId })
    })
    .catch(err => {
        console.log('todo action -> cannot remove todo', err)
        throw err
    })
}