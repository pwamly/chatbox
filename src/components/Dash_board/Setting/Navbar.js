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
import avatar from '../../../assets/demologo.png';

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
        <div className="subnav">
            <nav>
                <div
                    className={
                        showMediaIcons
                            ? 'menu-link mobile-menu-link'
                            : 'menu-link'
                    }
                >
                    {/* <div className="menu-link"> */}
                    <ul
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '30px'
                        }}
                    >
                        <Link
                            onClick={() => {
                                window.location.replace('/dashboard');
                            }}
                        >
                            <li>
                                <a href="#">Zones</a>
                            </li>
                        </Link>
                        <Link
                            onClick={() => {
                                // history.push('/dashboard/orders');
                                window.location.replace('/dashboard/orders');
                            }}
                        >
                            <li>
                                <a href="#">Weight </a>
                            </li>
                        </Link>

                        <Link
                            onClick={() => {
                                window.location.replace('/dashboard/dispatch');
                            }}
                        >
                            <li>
                                <a href="#">Destinations</a>
                            </li>
                        </Link>
                        <Link
                            onClick={() => {
                                window.location.replace('/dashboard/delivery');
                            }}
                        >
                            <li>
                                <a href="#">Price</a>
                            </li>
                        </Link>

                        <Link>
                            <li></li>
                        </Link>
                    </ul>
                </div>

                <div className="social-media">
                    <div className="header">
                        <div className="header__nav">
                            <Link to="/login">
                                <div className="header__option">
                                    <span className="header__optionLineTwo"></span>
                                </div>
                            </Link>
                        </div>

                        <div className="hamburger-menu">
                            <a
                                href="#"
                                onClick={() =>
                                    setShowMediaIcons(!showMediaIcons)
                                }
                            >
                                <GiHamburgerMenu />
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
const MapStateToprops = (store) => {
    return { ...store };
};

export default connect(MapStateToprops)(Navbar);
