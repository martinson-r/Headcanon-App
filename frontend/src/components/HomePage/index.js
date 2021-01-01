import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFics } from "../../store/fics";
import { NavLink, Route, Switch, useHistory } from "react-router-dom";
import FicDetail from "../FicDetail";
import BookShelf from "../BookShelf";
import ShelfDetail from "../ShelfDetail";
import AddShelf from "../AddShelf";
import EditReview from "../EditReview";
import AddFicToDatabase from "../AddFicToDatabase";
import DemoLogin from "../DemoLogin";
import Search from "../Search";
import './Homepage.css';

const HomePage = () => {

    const dispatch = useDispatch();
    const fics = useSelector(state => state.fics.list);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
      dispatch(getFics());
    }, [dispatch]);

    if (!fics.length) {
      return null;
    }
    return (
        <>
          <BookShelf />
          <Switch>
        <Route exact path="/">
            <Search />
            <div className="fics"> <h2>LATEST FICS</h2>
            {fics.map((fic) => {
              return(<NavLink key={fic.id} to={`/fics/${fic.id}`}>{fic.title}<br /></NavLink>)
          })}</div>
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
