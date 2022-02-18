import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { ADD_USER } from '../../../actions';
import { ProtectRoute } from '../../../components/ProtectRoute';
import BranchDash from './Table/Branchtable';
import View from './ViewDispatch/View';
import createBundle from './ViewDispatch/AddOrdertoBundle';
import ScheduleDispatch from './ViewDispatch/ScheduleDispatch';
import DeliverDispatch from './ViewDispatch/DeliverDispatch';

import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// function Index({ adduser }) {
//   return (
//     <div style={{ height: '600px' }}>{!adduser ? <Table /> : <Adduser />} </div>
//   );
// }
// const MapStateToprops = (store) => {
//   return { ...store };
// };
// export default connect(MapStateToprops)(Index);

function Index({ adduser }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Router>
        <Switch>
          <ProtectRoute
            path='/dashboard/bundles'
            exact
            component={BranchDash}
          />{' '}
          <ProtectRoute path='/dashboard/bundles/view' exact component={View} />{' '}
          <ProtectRoute
            path='/dashboard/bundles'
            exact
            component={BranchDash}
          />{' '}
          <ProtectRoute
            path='/dashboard/bundles/create-bundle'
            exact
            component={createBundle}
          />
          <ProtectRoute
            path='/dashboard/bundles/schedule-dispatch'
            exact
            component={ScheduleDispatch}
          />
          <ProtectRoute
            path='/dashboard/bundles/edit-bundle'
            exact
            component={createBundle}
          />
          <ProtectRoute
            path='/dashboard/bundles/deliver-dispatch'
            exact
            component={DeliverDispatch}
          />
        </Switch>{' '}
      </Router>{' '}
      {/* {!adduser ? <BranchDash /> : <Adduser />}{' '} */}
    </div>
  );
}
const MapStateToprops = (store) => {
  return { ...store };
};
export default connect(MapStateToprops)(Index);
