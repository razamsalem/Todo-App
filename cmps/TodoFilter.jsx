
const { useSelector, useDispatch } = ReactRedux
import { SET_FILTER, SET_SEARCH_QUERY } from '../store/store.js'
import { SearchInput } from './SearchInput.jsx'

export function TodoFilter({filter}) {
    const dispatch = useDispatch()
    const searchQuery = useSelector(storeState => storeState.searchQuery)

    function handleFilterChange(newFilter) {
        dispatch({ type: SET_FILTER, newFilter })
    }

    function handleSearchChange(searchQuery) {
        dispatch({ type: SET_SEARCH_QUERY, searchQuery })
    }

    return (
        <section className="todo-filter">
            <SearchInput searchQuery={searchQuery} onSearchChange={handleSearchChange}/>

             <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => handleFilterChange('all')}
            >
                All
            </button>

            <button
                className={filter === 'active' ? 'active' : ''}
                onClick={() => handleFilterChange('active')}
            >
                Active
            </button>

            <button
                className={filter === 'done' ? 'active' : ''}
                onClick={() => handleFilterChange('done')}
            >
                Done
            </button>
        </section>
    )
}
