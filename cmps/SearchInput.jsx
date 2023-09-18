
const { useSelector, useDispatch } = ReactRedux
import { SET_SEARCH_QUERY } from '../store/reducers/todo.reducer.js'

export function SearchInput({ searchQuery }) {
    const dispatch = useDispatch()

    function handleSearchChange(ev) {
        dispatch({ type: SET_SEARCH_QUERY, searchQuery: ev.target.value });
    }

    return (
        <input
            className='search-input'
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
        />
    )
}
