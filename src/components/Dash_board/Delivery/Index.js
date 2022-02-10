import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { ADD_USER } from '../../../actions';
import { ProtectRoute } from '../../../components/ProtectRoute';
import DeliverOrder from './ViewDelivery/DeliverOrder';
import Branchtable from './Table/Branchtable';
import View from './ViewDelivery/View';
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
            path='/dashboard/delivery/view'
            exact
            component={View}
          />{' '}
          <ProtectRoute
            path='/dashboard/delivery'
            exact
            component={Branchtable}
          />{' '}
          <ProtectRoute
            path='/dashboard/deliver-order'
            exact
            component={DeliverOrder}
          />
        </Switch>{' '}
      </Router>{' '}
    </div>
  );
}
const MapStateToprops = (store) => {
  return { ...store };
};
export default connect(MapStateToprops)(Index);
