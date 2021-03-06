import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/HomePage";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EditReview from "./components/EditReview";
import PageNotFound from "./components/PageNotFound";
import BookShelf from "./components/BookShelf";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

  }, [dispatch]);

  return (
    <div>
      <div className="grid-container">
        <div className="header">
        <h1 className="header-title">HeadCanonDB</h1>
        <Navigation isLoaded={isLoaded} />
        </div>
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route
          path={["/", "/fics/:ficId", "/shelves/:shelfId", "/shelf/add", "/fic/add", "./demo"]}
          exact>
            <HomePage />
          </Route>
          <Route path="/review/edit/:id">
            <EditReview />
          </Route>
          <Route>
            <BookShelf />
            <PageNotFound />
          </Route>
        </Switch>
      )}
      </div>
    </div>
  );
}

export default App;
