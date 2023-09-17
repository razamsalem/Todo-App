import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateBalance,
    updateUser,
    addActivity
}

window.us = userService

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = {
        username,
        password,
        fullname,
        balance: 10000,
        activities: [],
        prefs: {
            color: '#232323',
            bgColor: '#fff'
        }
    }

    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}

function updateBalance(diff) {
    return userService.getById(getLoggedinUser()._id)
        .then(user => {
            if (user.balance + diff < 0) return Promise.reject('No credit')
            user.balance += diff
            return storageService.put(STORAGE_KEY, user)

        })
        .then(user => {
            _setLoggedinUser(user)
            return user.balance
        })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, balance: user.balance, activities: user.activities, prefs: user.prefs }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function updateUser(updatedUser) {
    return storageService.put(STORAGE_KEY, updatedUser)
        .then(() => {
            _setLoggedinUser(updatedUser)
            return updatedUser
        })
        .catch((error) => {
            console.error('Error updating user:', error)
        })
}

function addActivity(userId, activity) {
    return userService.getById(userId)
        .then(user => {
            user.activities.unshift(activity)
            return storageService.put(STORAGE_KEY, user)
        })
        .then(updatedUser => {
            _setLoggedinUser(updatedUser)
            return updatedUser
        })
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



