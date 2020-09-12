import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(GlobalContext);

  function handleLogout() {
    logout();
  }
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className='fas fa-id-card-alt'> Contact Keeper</i>
      </h1>
      <ul>
        <li>
          <Link to='/about'>About</Link>
        </li>
        {!user ? (
          <Fragment>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <Link onClick={handleLogout} to='/logout'>
                Logout
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};
export default Navbar;
