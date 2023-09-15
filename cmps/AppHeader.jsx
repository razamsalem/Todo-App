const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { userService } from "../services/user.service.js"
import { LoginSignup } from './LoginSignup.jsx'

export function AppHeader() {

    // const dispatch = useDispatch()
    const [user, setUser] = useState(userService.getLoggedinUser())
    // const user = useSelector(storeState => storeState.loggedinUser)
    const todos = useSelector(storeState => storeState.todos)
    const [progressBarWidth, setProgressBarWidth] = useState(0)

    useEffect(() => {
        setUser(userService.getLoggedinUser())
    }, [todos])

    useEffect(() => {
        const doneTodos = todos.filter(todo => todo.isDone)
        const totalTodos = todos.length
        const percentageDone = totalTodos === 0 ? 0 : (doneTodos.length / totalTodos) * 100
        setProgressBarWidth(percentageDone)
    }, [todos]);


    function onSetUser(user) {
        setUser(user)
        // dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        // TODO: move to a function and use dispatch
        userService.logout()
            .then(() => {
                setUser(null)
                // dispatch({ type: SET_USER, user: null })
            })
    }

    return (
        <header className="app-header">
            <Link to="/">
                <h3>LOGO!</h3>
            </Link>
            {user && <section className="user-info">
                <p>{user.fullname} <span>${user.score.toLocaleString()}</span></p>
                <button onClick={onLogout}>Logout</button>
            </section>}
            {!user && <section className="user-info">
                <LoginSignup onSetUser={onSetUser} />
            </section>}
            {todos.length > 0 && 
                <div className="progress-bar">
                    <p>{progressBarWidth.toFixed(2)}% Done</p>
                    <progress value={progressBarWidth} max="100">
                        {progressBarWidth.toFixed(2)}%
                    </progress>
                </div>
            }
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/todo">Todo</NavLink>
            </nav>
        </header>
    )
}
