import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFics } from "../../store/fics";
import { NavLink, Route, useHistory } from "react-router-dom";
import FicDetail from "../FicDetail";
import BookShelf from "../BookShelf";
import ShelfDetail from "../ShelfDetail";
import AddShelf from "../AddShelf";
import AddFicToDatabase from "../AddFicToDatabase";

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
        <BookShelf />
        <Route exact path="/">
            <p>LATEST FICS</p>
            {fics.map((fic) => {
              return(<NavLink key={fic.id} to={`/fics/${fic.id}`}>{fic.title}</NavLink>)
          })}
        </Route>
        <Route path="/fics/:ficId">
          <FicDetail />
        </Route>
        <Route path="/shelves/:shelfId">
          <ShelfDetail />
        </Route>
        <Route path="/shelf/add">
          <AddShelf />
        </Route>
        <Route path="/fic/add">
          <AddFicToDatabase />
        </Route>
        </div>

    )
}

export default HomePage;
