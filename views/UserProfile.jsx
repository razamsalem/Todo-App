const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux
import { SET_USER, SET_USER_PREFERENCES } from '../store/store.js'
import { userService } from '../services/user.service.js'
import { TodoPreview } from '../cmps/TodoPreview.jsx'

export function UserProfile() {
    const dispatch = useDispatch()
    const loggedinUser = useSelector((storeState) => storeState.loggedinUser)

    if (!loggedinUser) {
        return <div>You need to log in first</div>;
    }

    const [isEditing, setIsEditing] = useState(false)
    const [editedFullname, setEditedFullname] = useState(loggedinUser.fullname)
    const [prefs, setPrefs] = useState(loggedinUser.prefs)
    const todos = useSelector((storeState) => storeState.todos)

    useEffect(() => {
        document.body.style.color = prefs.color
        document.body.style.backgroundColor = prefs.bgColor
    }, [prefs])

    function handleFullnameChange(ev) {
        setEditedFullname(ev.target.value)
    }

    function handlePrefsChange(ev) {
        const { name, value } = ev.target
        setPrefs({ ...prefs, [name]: value })
    }

    function handleSaveChanges() {
        const updatedUser = { ...loggedinUser, fullname: editedFullname, prefs }
        dispatch({ type: SET_USER, user: updatedUser })
        userService.updateUser(updatedUser)
        dispatch({ type: SET_USER_PREFERENCES, prefs })
        setIsEditing(false)
    }

    return (
        <div>
            <h3>Preferences:</h3>
            <div>
                {isEditing ? (
                    <div>
                        <label htmlFor="fullname">Full Name: </label>
                        <input
                            type="text"
                            id="fullname"
                            value={editedFullname}
                            onChange={handleFullnameChange}
                        />
                    </div>
                ) : (
                    <div>
                        <label>Full Name: </label>
                        <span>{editedFullname} </span>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                )}
            </div>
            <div>
                <label htmlFor="color">Text color: </label>
                <input
                    type="color"
                    id="color"
                    name='color'
                    value={prefs.color}
                    onChange={handlePrefsChange}
                />

                <label htmlFor="bgColor"> Background color: </label>
                <input
                    type="color"
                    id='bgColor'
                    name='bgColor'
                    value={prefs.bgColor}
                    onChange={handlePrefsChange}
                />
            </div>
            <br />
            <button onClick={handleSaveChanges}>Save</button>
            <br />
            Your todos:
            {console.log(todos)}
            {todos.filter(todo => todo.owner === loggedinUser.fullname)
                .map(todo =>
                    <li key={todo._id}>
                        <TodoPreview todo={todo} />
                    </li>
                )}
        </div>
    )
}