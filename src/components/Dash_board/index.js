import React, { useEffect } from "react";
import Navbar from "./Navibar/index";
import { IconContext } from "react-icons";
import Container from "@material-ui/core/Container";
import Footer from "../Footer/Footer";
import { connect } from "react-redux";
import { getUserId, httpActions } from "../../client/index";
import Team from "./Team/Index";
import Branch from './branchs/Index';
import Orders from './Orders/Index';
import Dispatch from './Dispatch/Index';
import Pickups from './Pickups/Index';
import Delivery from './Delivery/Index';
import Bundle from './Bundle/Index';
import Settings from './Setting/Index';
import Customers from './Customers/Index';
import Transporters from './Transporters/Index';
import Vehicles from './Vehicle/Index';
import { useGet } from '../../hooks';
import './dashbar.css';
import RegistrationForm from './Registration';
import Dashview from './DashView';
import { ProtectRoute } from '../../components/ProtectRoute';
import Regform from '../Pdf/Pdf';
import Printform from '../Dash_board/Printform/Printform';
import Spline from './Charts/Spline';
import Profile from '../Dash_board/Profile/Profile';
import { SAVE_INITIAL_DATA } from '../../actions';
import Report from './Report/Report';
import { Breakpoint, BreakpointProvider } from 'react-socks';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

const { getProfile } = httpActions;

function Index({ modalShown, toggleModal, showProfile, dispatch, pdf }) {
  let initial;
  const userid = getUserId();
  const { result: user, loading, refresh } = useGet(userid, getProfile);

  const { fname, lname, email, username, phone, userRole, branchId, dashData } =
    user || {};

  // if (fname && lname) {

  //   initial = `${fname} ${lname}`
  //     .split(' ')
  //     .map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null))
  //     .join('')
  //     .toUpperCase();
  // }
  initial = `${fname} ${lname}`;
  useEffect(() => {
    dispatch({
      type: SAVE_INITIAL_DATA,
      payload: {
        fname,
        lname,
        email,
        username,
        phone,
        userRole,
        branchId,
        initial,
        dashData,
      },
    });
  }, [user]);

  return (
    <>
      {showProfile && <Profile />}{' '}
      <BreakpointProvider>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Router>
              <Navbar props={initial} />
              <Container className='dashboard'>
                <Switch>
                  <ProtectRoute path='/dashboard' exact component={Dashview} />
                  <ProtectRoute path='/dashboard/employee' component={Team} />
                  <ProtectRoute path='/dashboard/reports' component={Report} />
                  <ProtectRoute path='/dashboard/branch' component={Branch} />
                  <ProtectRoute path='/dashboard/orders' component={Orders} />
                  <ProtectRoute path='/dashboard/pickups' component={Pickups} />
                  <ProtectRoute
                    path='/dashboard/delivery'
                    component={Delivery}
                  />
                  <ProtectRoute
                    path='/dashboard/customers'
                    component={Customers}
                  />{' '}
                  <ProtectRoute
                    path='/dashboard/transporters'
                    component={Transporters}
                  />{' '}
                  <ProtectRoute
                    path='/dashboard/vehicles'
                    component={Vehicles}
                  />{' '}
                  <ProtectRoute
                    path='/dashboard/dispatch'
                    component={Dispatch}
                  />{' '}
                  <ProtectRoute path='/dashboard/bundles' component={Bundle} />{' '}
                  <ProtectRoute
                    path='/dashboard/settings'
                    component={Settings}
                  />{' '}
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
