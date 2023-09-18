
export function TodoPreview({ todo, onRemoveTodo, onEditTodo, onToggleDone }) {

    return (
        <div className={`todo-preview ${todo.isDone ? 'done' : ''}`}>
            <h3 onClick={() => onToggleDone(todo)}>{todo.title}</h3>
            <p>Created At: {todo.time}</p>
            <p>By: {todo.owner}</p>
            {!todo.isDone && <button className="btn edit-btn" onClick={() => onEditTodo(todo)}>Edit</button>}
            <button className="btn remove-btn" onClick={() => onRemoveTodo(todo._id)}>Remove <i className="fa-regular fa-trash-can"></i></button>
            {!todo.isDone && <button className="btn check-btn" onClick={() => onToggleDone(todo)}>Check <i className="fa-solid fa-circle-check"></i> </button>}
        </div>
    )
}