import './navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import React, { useState } from 'react';

// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Signiout from '@material-ui/icons/ExitToApp';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../../client/index';
import { connect } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
// import { useStateValue } from './StateProvider';
import { SvgIcon } from '@mui/material';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

function Navbar({ profile }) {

  const history = useHistory();
  const [showMediaIcons, setShowMediaIcons] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='header'>
      <nav className='main-nav'>
        <div className='logo-sga'>
          <Link to='/dashboard'>
            <h2>
              {/* <span>S</span> */}
              <span className='sga-sub-log'>SGA Courier Department System</span>
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
                // history.push('/dashboard/orders');
                window.location.replace('/dashboard/bundles');
              }}>
              <li>
                <a href='#'>Bundles</a>
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
            <Link>
              <li></li>
            </Link>

            <div>
              <Button
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}>
                {profile.initial}
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem id='profile'
                  onClick={() => {
                    // handle profile
                    handleClose();
                  }}>
                  Profile
                </MenuItem>
                <MenuItem id='settings'
                  onClick={() => {
                    // handle profile
                  window.location.replace('dashboard/settings');
                    handleClose();
                  }}>
                  Settings
                </MenuItem>
                <MenuItem id='logout'
                  onClick={() => {
                    logout()
                    handleClose();
                  }}>
                  <Signiout /> Logout
                </MenuItem>
              </Menu>
            </div>
          </ul>
        </div>

        <div className='social-media'>
          <div className='header'>
            <div className='header__nav'>
              <Link to='/login'>
                <div className='header__option'>
                  <span className='header__optionLineTwo'></span>
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
const MapStateToprops = (store) => {
  return { ...store };
};

export default connect(MapStateToprops)(Navbar);