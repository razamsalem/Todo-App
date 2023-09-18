import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'
import { TodoList } from '../cmps/TodoList.jsx'
import { TodoFilter } from '../cmps/TodoFilter.jsx'

import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from '../store/reducers/todo.reducer.js'
import { SET_USER_BALANCE } from '../store/reducers/user.reducer.js'
import { userService } from '../services/user.service.js'
import { loadTodos, removeTodo } from '../store/actions/todo.actions.js'

const { Link } = ReactRouterDOM
const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function TodoApp() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const filter = useSelector(storeState => storeState.todoModule.filter)
    const searchQuery = useSelector(storeState => storeState.todoModule.searchQuery)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)


    useEffect(() => {
        loadTodos()
            .catch(err => {
                console.log(err)
            })
    }, [])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
            })
            .catch(err => {
                console.log(err)
            })
    }

    function onAddTodo() {
        const todoToSave = todoService.getEmptyTodo()

        if (todoToSave.title === null || todoToSave.title.trim() === '') return
        todoToSave.owner = loggedinUser.fullname

        todoService.save(todoToSave)
            .then(savedTodo => {
                const activity = { txt: todoToSave.title, at: todoToSave.time }
                userService.addActivity(userService.getLoggedinUser()._id, activity)
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
                dispatch({ type: ADD_TODO, todo: savedTodo })
            })
            .catch(err => {
                console.log('Cannot add todo', err)
                showErrorMsg('Cannot add todo')
            })
    }

    function onEditTodo(todo) {
        const title = prompt('New Title')
        const todoToSave = { ...todo, title }
        if (todoToSave.title === null || todoToSave.title.trim() === '') return

        todoService.save(todoToSave)
            .then(savedTodo => {
                dispatch({ type: UPDATE_TODO, todo: savedTodo })
                showSuccessMsg(`Todo updated title to: $${savedTodo.title}`)
            })
            .catch(err => {
                console.log('Cannot update todo', err)
                showErrorMsg('Cannot update todo')
            })
    }

    function onToggleDone(todo) {
        if (todo.isDone) return
        const updatedTodo = { ...todo, isDone: !todo.isDone }
        const reward = 10

        todoService.save(updatedTodo)
            .then(savedTodo => {
                dispatch({ type: UPDATE_TODO, todo: updatedTodo })
                showSuccessMsg('Todo marked as done:', savedTodo)
                if (!todo.isDone) {
                    userService.updateBalance(+reward)
                        .then(newBalance => {
                            dispatch({ type: SET_USER_BALANCE, balance: newBalance })
                            showSuccessMsg(`You earned: $ ${reward.toLocaleString()}`)
                        })
                }
            })
            .catch(err => {
                console.error('Error marking todo as done:', err)
            })
    }



    return (
        <section className="todo-app">
            <h1 className='search-todos'>Search Todos</h1>
            <TodoFilter filter={filter} />
            {loggedinUser
                ? <button className='add-todo-btn' onClick={onAddTodo}>New Todo 📃</button>
                : <div>Please login to add todos</div>
            }

            {!isLoading && <TodoList todos={todos} filter={filter} searchQuery={searchQuery} onEditTodo={onEditTodo} onRemoveTodo={onRemoveTodo} onToggleDone={onToggleDone} />}

            {isLoading && <div>Loading...</div>}
        </section>
    )
}
