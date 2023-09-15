import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'
import { TodoList } from '../cmps/TodoList.jsx'
import { TodoFilter } from '../cmps/TodoFilter.jsx'

import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from '../store/store.js'

const { Link } = ReactRouterDOM
const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function TodoApp() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todos)
    const filter = useSelector(storeState => storeState.filter)
    const searchQuery = useSelector(storeState => storeState.searchQuery)


    useEffect(() => {
        todoService.query()
            .then(todos => {
                showSuccessMsg('Todos Reloaded successfully')
                dispatch({ type: SET_TODOS, todos })
            })
    }, [])

    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
                dispatch({ type: REMOVE_TODO, todoId })
            })
    }

    function onAddTodo() {
        const todoToSave = todoService.getEmptyTodo()

        if (todoToSave.title === null || todoToSave.title.trim() === '') return

        todoService.save(todoToSave)
            .then(savedTodo => {
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
        const updatedTodo = { ...todo, isDone: !todo.isDone }

        todoService.save(updatedTodo)
        .then(savedTodo => {
                dispatch({ type: UPDATE_TODO, todo: updatedTodo })
                showSuccessMsg('Todo marked as done:', savedTodo)
            })
            .catch(err => {
                console.error('Error marking todo as done:', err)
            })
    }


    return (
        <section className="todo-app">
            <h1>Let's Do Todo</h1>
            <TodoFilter filter={filter}/>
            <button onClick={onAddTodo}>New Todo 📃</button>
            <TodoList todos={todos} filter={filter} searchQuery={searchQuery} onEditTodo={onEditTodo} onRemoveTodo={onRemoveTodo} onToggleDone={onToggleDone} />
        </section>
    )
}
