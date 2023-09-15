
const { useSelector, useDispatch } = ReactRedux
import { SET_SEARCH_QUERY } from '../store/store.js'

export function SearchInput({searchQuery}) {
    const dispatch = useDispatch()

    function handleSearchChange(ev) {
        dispatch({ type: SET_SEARCH_QUERY, searchQuery: ev.target.value });
    }

    return (
        <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
        />
    )
}
