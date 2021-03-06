import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
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
// import { getPaginatedFics } from "../../store/fics";


const HomePage = () => {

    const dispatch = useDispatch();
    const fics = useSelector(state => state.fics.list);
    const sessionUser = useSelector((state) => state.session.user);
    const [page, setPage] = useState(0);

    useEffect(() => {
      dispatch(getFics());
    }, [dispatch]);


    // useEffect(() => {
    //   const size = 3;
    //   const payload = {page, size}
    //   dispatch(getPaginatedFics(payload));
    //   }, [dispatch]);

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
            <Route>
              <PageNotFound />
            </Route>
        </Switch>
        </>

    )
}

export default HomePage;
