import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div className="header-navigation">
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/fic/add">Add a Fic</NavLink>
      {isLoaded && sessionLinks}
    </div>
    

  );
}

export default Navigation;
