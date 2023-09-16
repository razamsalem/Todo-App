
export function TodoPreview({ todo, onRemoveTodo, onEditTodo, onToggleDone }) {

    return (
        <div className={`todo-preview ${todo.isDone ? 'done' : ''}`}>
            <h3 onClick={() => onToggleDone(todo)}>{todo.title}</h3>
            {todo.owner && <p>Owner: {todo.owner.name}</p>}
            <p>Created At: {todo.time}</p>
            {!todo.isDone && <button className="btn edit-btn" onClick={() => onEditTodo(todo)}>Edit</button>}
            <button className="btn remove-btn" onClick={() => onRemoveTodo(todo._id)}>Remove</button>
            {!todo.isDone && <button className="btn check-btn" onClick={() => onToggleDone(todo)}>Check</button>}
        </div>
    )
}