import './navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import React, { useState } from 'react';
// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Signiout from '@material-ui/icons/ExitToApp';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../../client/index';
// import { useStateValue } from './StateProvider';

function Navbar() {
  const [showMediaIcons, setShowMediaIcons] = useState(false);

 

  return (
    <div className='header'>
      <nav className='main-nav'>
        <div className='logo'>
          <Link to='/'>
            <h2>
              <span>S</span>
              <span>GA</span>
            </h2>
          </Link>
        </div>

        <div
          className={
            showMediaIcons ? 'menu-link mobile-menu-link' : 'menu-link'
          }>
          {/* <div className="menu-link"> */}
          <ul>
            <Link to='/dashboard'>
              <li>
                <a href='#'>Dashboard</a>
              </li>
            </Link>
            <Link to='/sga'>
              <li>
                <a href='#'>SGA</a>
              </li>
            </Link>
            <Link
              onClick={() => {
                // history.push('/dashboard/orders');
                window.location.replace('/dashboard/orders');
              }}>
              <li>
                <a href='#'>Orders </a>
              </li>
            </Link>
            <Link
              onClick={() => {
                window.location.replace('/dashboard/dispatch');
              }}>
              <li>
                <a href='#'>Dispatch</a>
              </li>
            </Link>
            <Link
              onClick={() => {
                window.location.replace('/dashboard/delivery');
              }}>
              <li>
                <a href='#'>Delivery</a>
              </li>
            </Link>
            <Link to='#'>
              <li>
                <a href='#'>Reports</a>
              </li>
            </Link>
          </ul>
        </div>

        <div className='social-media'>
          <div className='header'>
            <div className='header__nav'>
              <Link to='/login'>
                <div className='header__option'>
                  <span
                    className='header__optionLineTwo'
                    onClick={() => logout()}>
                    SW <Signiout />
                  </span>
                </div>
              </Link>
            </div>

            <div className='hamburger-menu'>
              <a href='#' onClick={() => setShowMediaIcons(!showMediaIcons)}>
                <GiHamburgerMenu />
              </a>
            </div>
          </div>
        </div>
      </nav>
      <nav
        className='sub-nav'
        style={{
          background: '#f3f4f6',
          width: '100%',
          padding: '30px 10px 10px 40px',
        }}></nav>
    </div>
  );
}
export default Navbar;
