const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader.jsx'
import { store } from './store/store.js'
import { About } from './views/About.jsx'
import { Home } from './views/Home.jsx'
import { TodoApp } from './views/TodoApp.jsx'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/todo" element={<TodoApp />} />
                    </Routes>
                </section>
            </Router>
        </Provider>
    )
}
