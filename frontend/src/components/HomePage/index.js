import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFics } from "../../store/fics";
import { Route, Switch } from "react-router-dom";
import FicDetail from "../FicDetail";
import BookShelf from "../BookShelf";
import ShelfDetail from "../ShelfDetail";
import AddShelf from "../AddShelf";
import AddFicToDatabase from "../AddFicToDatabase";
import DemoLogin from "../DemoLogin";
import Search from "../Search";
import './Homepage.css';
import FicResults from "../FicResults";
import PageNotFound from "../PageNotFound";

const HomePage = () => {

    const dispatch = useDispatch();
    const fics = useSelector(state => state.fics.list);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
      dispatch(getFics());
    }, [dispatch]);

    if (!fics) {
      return null;
    }

    return (
        <>
          <BookShelf />
          <Switch>
           <Route exact path="/">
              <div className="fics">
                <Search />
                <FicResults fics={fics} />
              </div>
            </Route>
            <Route path="/fics/:ficId">
              <FicDetail ficState={fics}/>
            </Route>
            <Route path="/shelves/:shelfId">
              <ShelfDetail />
            </Route>
            {sessionUser && <Route path="/shelf/add">
              <AddShelf />
            </Route>}
            <Route path="/fic/add">
              <AddFicToDatabase />
            </Route>
            <Route path="/demo">
              <DemoLogin />
            </Route>
        </Switch>
        </>

    )
}

export default HomePage;
