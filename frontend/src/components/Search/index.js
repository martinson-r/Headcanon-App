
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import { searchFics } from "../../store/fics";

const Search = () => {

    const fics = useSelector(state => state.fics.list);
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const updateQuery = (e) => setQuery(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
          query
        };
        dispatch(searchFics(payload));
      };

    return (
        <>
          <form onSubmit={handleSubmit}>
            <h2>Search FanFiction:</h2>
            <input type="text" value={query} onChange={updateQuery}></input>
            <button type="submit">Search Fics</button>
          </form>
        </>

    )
}

export default Search;