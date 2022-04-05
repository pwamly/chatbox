import './navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import React, { useState } from 'react';
import { logout } from '../../../client';

// import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Signiout from '@material-ui/icons/ExitToApp';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
// import { useStateValue } from './StateProvider';
import { SvgIcon } from '@mui/material';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import avatar from '../../../assets/tz_logo.png';

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
    const logomain = {
        background: 'none',
        width: '100px',
        height: '100px',
        padding: '20px',
        backgroundColor: 'none',
        margin: 'auto',
        borderStyle: 'none !important'
    };

    return (
        <div className="header">
            <nav className="main-nav">
                <div className="logo-sga">
                    <Link to="/dashboard">
                        <h2>
                            {/* <span>S</span> */}
                            {/* <span className='sga-sub-log'>SGA Courier Department System</span> */}
                            <div style={logomain}>
                                <img className="aimg" src={avatar} alt="" />
                            </div>
                        </h2>
                    </Link>
                </div>
                <div className="social-media">
                    <div className="header">
                        <span
                            className="header__optionLineTwo"
                            style={{ fontSize: 30 }}
                        >
                            SIMBA vs YANGA : 2022 WINNERS
                        </span>
                    </div>
                </div>{' '}
                <div
                    onClick={() => {
                        logout();
                        window.location.replace('/login');
                    }}
                    className="social-media"
                    id="logout"
                >
                    <span>Users</span>
                </div>
                <div
                    onClick={() => {
                        logout();
                        window.location.replace('/login');
                    }}
                    className="social-media"
                    id="logout"
                >
                    <span>Logout</span>
                </div>
            </nav>
            <nav
                className="sub-nav"
                style={{
                    background: '#f3f4f6',
                    width: '100%',
                    padding: '30px 10px 10px 40px'
                }}
            ></nav>
        </div>
    );
}
const MapStateToprops = (store) => {
    return { ...store };
};

export default connect(MapStateToprops)(Navbar);
