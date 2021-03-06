import React from 'react';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoLogin from '../DemoLogin';
import './Navigation.css';
import { getFics } from "../../store/fics";

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton className="navlink" user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <span className="navigation-button"><LoginFormModal /></span>
        <NavLink className="navlink" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="header-navigation">
      <NavLink className="navlink" exact to="/" onClick={()=> { dispatch(getFics())} }>Home</NavLink>
      <NavLink className="navlink" exact to="/fic/add">Add a Fic</NavLink>
      {isLoaded && sessionLinks}
      <DemoLogin />
    </div>


  );
}

export default Navigation;
