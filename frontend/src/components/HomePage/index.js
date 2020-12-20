import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFics } from "../../store/fics";
import { NavLink, Route } from "react-router-dom";
import FicDetail from "../FicDetail";
import BookShelf from "../BookShelf";
import ShelfDetail from "../ShelfDetail";

const HomePage = () => {
    const dispatch = useDispatch();
    const fics = useSelector(state => state.fics.list.data);
    console.log('FICS', fics);

    useEffect(() => {
      dispatch(getFics());
    }, [dispatch]);

    if (!fics) {
      return null;
    }

    return (
        <div>
          {/* replace with bookshelves */}
            {fics.map((fic) => {
            return(<NavLink key={fic.id} to={`/fics/${fic.id}`}>{fic.title}</NavLink>)
        })}
        <BookShelf />
        <Route path="/fics/:ficId">
          <FicDetail />
        </Route>
        <Route path="/shelves/:shelfId">
          <ShelfDetail />
        </Route>
        </div>

    )
}

export default HomePage;
