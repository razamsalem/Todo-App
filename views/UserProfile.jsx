const { useState } = React
const { useSelector, useDispatch } = ReactRedux

import { SET_USER, SET_USER_PREFERENCES } from '../store/store.js'

export function UserProfile() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.loggedinUser)
    const [editingFullName, setEditingFullName] = useState(false)
    const [newFullname, setNewFullname] = useState(user.fullname)
    const [prefs, setPrefs] = useState(user.prefs)

}