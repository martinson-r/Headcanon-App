
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import { searchFics } from "../../store/fics";

const Search = () => {

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const size = 3;
    const dispatch = useDispatch();
    const updateQuery = (e) => setQuery(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
          query,
          page,
          size
        };
        dispatch(searchFics(payload));
        setQuery("");
      };

    return (
        <>
          <form onSubmit={handleSubmit}>
            <h2>Search FanFiction:</h2>
            <input type="text" value={query} onChange={updateQuery} required></input>
            <button type="submit">Search Fics</button>
          </form>
        </>

    )
}

export default Search;
