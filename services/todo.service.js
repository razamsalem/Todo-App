
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const TODO_KEY = 'todoDB'

export const todoService = {
    query,
    add,
    remove,
    // getById,
    save,
    getEmptyTodo,
}


function query() {
    return storageService.query(TODO_KEY)
        .then(todos => todos)
    // return axios.get(BASE_URL).then(res => res.data)
}

function add(todo) {
    return storageService.post(TODO_KEY, todo)
}

function remove(todoId) {
    return storageService.remove(TODO_KEY, todoId)
    // return Promise.reject('Not now!')
}

// function getById(todoId) {
//     return storageService.get(TODO_KEY, todoId)
// }


function save(todo) {
    if (todo._id) {
        return storageService.put(TODO_KEY, todo)
    } else {
        // when switching to backend - remove the next line
        // todo.owner = userService.getLoggedinUser().fullname
        return storageService.post(TODO_KEY, todo)
    }
}

function getEmptyTodo() {
    return {
        isDone: false,
        title: prompt('title?'),
        time: utilService.getTimeFromStamp(Date.now()),
    }
}

function _createTodos() {
    const todos = utilService.loadFromStorage(TODO_KEY)
    if (!todos || !todos.length) utilService.saveToStorage(TODO_KEY, todos)
}