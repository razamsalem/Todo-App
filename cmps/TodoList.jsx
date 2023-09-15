import { TodoPreview } from './TodoPreview.jsx'

export function TodoList({ todos, filter, searchQuery, onRemoveTodo, onEditTodo, onToggleDone }) {
    if (!todos) return <div>Loading...</div>
    if (!todos.length) return <div>No todos... it's probably a good day ⛱️</div>

    return (
        <section className="todo-list-container">
            <ul>
                {todos
                    .filter(todo => {
                        if (filter === 'all') return true
                        if (filter === 'active') return !todo.isDone
                        if (filter === 'done') return todo.isDone
                        return true
                    })
                    .filter(todo => {
                       return todo.title.toLowerCase().includes(searchQuery.toLowerCase())
                    })
                    .map(todo =>
                        <li key={todo._id}>
                            <TodoPreview todo={todo} onRemoveTodo={onRemoveTodo} onEditTodo={onEditTodo} onToggleDone={onToggleDone} />
                        </li>
                    )}
            </ul>
        </section>
    )
}