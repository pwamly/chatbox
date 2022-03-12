import React, { useEffect } from "react";
import Navbar from "./Navibar/index";
import { IconContext } from "react-icons";
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
// import { getUserId, httpActions } from '../../client/index';
import DashView from './Transporters/Index';
import { useGet } from '../../hooks';
import './dashbar.css';
import { ProtectRoute } from '../../components/ProtectRoute';
import { SAVE_INITIAL_DATA } from '../../actions';
import { Breakpoint, BreakpointProvider } from 'react-socks';
import {
    Redirect,
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

// const { getProfile } = httpActions;

function Index({ modalShown, toggleModal, showProfile, dispatch, pdf }) {
    let initial;
    // const userid = getUserId();
    // const { result: user, loading, refresh } = useGet(userid, getProfile);

    // const {
    //     fname,
    //     lname,
    //     email,
    //     username,
    //     phone,
    //     userRole,
    //     branchId,
    //     dashData
    // } = user || {};

    // initial = `${fname} ${lname}`;
    // useEffect(() => {
    //     dispatch({
    //         type: SAVE_INITIAL_DATA,
    //         payload: {
    //             fname,
    //             lname,
    //             email,
    //             username,
    //             phone,
    //             userRole,
    //             branchId,
    //             initial,
    //             dashData
    //         }
    //     });
    // }, [user]);

    return (
        <>
            {showProfile}{' '}
            <BreakpointProvider>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Router>
                            <Navbar />
                            <Container className="dashboard">
                                <Switch>
                                    <ProtectRoute
                                        path="/dashboard"
                                        exact
                                        component={DashView}
                                    />
                                </Switch>{' '}
                            </Container>{' '}
                        </Router>{' '}
                    </div>{' '}
                </IconContext.Provider>{' '}
            </BreakpointProvider>
        </>
    );
}
const mapStateToprops = (store) => {
  return { ...store };
};

export default connect(mapStateToprops)(Index);
