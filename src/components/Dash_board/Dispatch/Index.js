import React, { useMemo } from 'react';
import Table from './Table/Branchtable';
import UnloadDispatchDelivered from './ViewDispatch/UnloadDispatchDelivered';
import { connect } from 'react-redux';
import { ADD_USER } from '../../../actions';
import { ProtectRoute } from '../../../components/ProtectRoute';
import ScheduleDispatchDelivery from './ViewDispatch/ScheduleDispatchDelivery';
import BranchDash from './Table/Branchtable';
import View from './ViewDispatch/View';
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
            path='/dashboard/dispatch/view'
            exact
            component={View}
          />{' '}
          <ProtectRoute
            path='/dashboard/dispatch'
            exact
            component={BranchDash}
          />{' '}
          <ProtectRoute
            path='/dashboard/dispatch/unload-dispatch'
            component={UnloadDispatchDelivered}
          />{' '}
          <ProtectRoute
            path='/dashboard/dispatch/schedule-dispatch-delivery'
            exact
            component={ScheduleDispatchDelivery}
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
