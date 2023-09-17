const { Link, NavLink } = ReactRouterDOM
const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { userService } from "../services/user.service.js"
import { LoginSignup } from './LoginSignup.jsx'
import { SET_USER } from '../store/store.js'

export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.loggedinUser)
    const todos = useSelector(storeState => storeState.todos)
    const [progressBarWidth, setProgressBarWidth] = useState(0)

    useEffect(() => {
        const doneTodos = todos.filter(todo => todo.isDone)
        const totalTodos = todos.length
        const percentageDone = totalTodos === 0 ? 0 : (doneTodos.length / totalTodos) * 100
        setProgressBarWidth(percentageDone)
    }, [todos])

    // if (user) {
    //     useEffect(() => {
    //         document.body.style.color = user.prefs.color
    //         document.body.style.backgroundColor = user.prefs.bgColor
    //     },[])
    // }

    function onSetUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        userService.logout()
            .then(() => {
                dispatch({ type: SET_USER, user: null })
            })
    }

    return (
        <header className="app-header">
            <Link to="/">
                <h3>Lets do todos!</h3>
            </Link>
            {user && <section className="user-info">
                <p>{user.fullname} <span>${user.balance.toLocaleString()}</span></p>
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
                <NavLink to="/profile">Profile</NavLink>
            </nav>
        </header>
    )
}
