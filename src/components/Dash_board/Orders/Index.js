import React, { useMemo } from 'react';
import Table from './Table/Branchtable';
import BranchDash from './Table/Branchtable';
import CreateOrder from './Orderform';
import { connect } from 'react-redux';
import { ADD_USER } from '../../../actions';
import { ProtectRoute } from '../../../components/ProtectRoute';
import Orderview from './ViewOrders/View';
import ItemForm from './ViewOrders/ItemModal';
import LoadPickup from './ViewOrders/LoadPickup';
import SchedulePickup from './ViewOrders/SchedulePickup';
import UnloadPickup from './ViewOrders/UnloadPickup';
import ScheduleDispatch from './ViewOrders/ScheduleDispatch';
import DeliverDispatch from './ViewOrders/DeliverDispatch';

import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

function Index({ adduser, bundleid }) {
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
          <ProtectRoute path='/dashboard/orders' exact component={BranchDash} />{' '}
          <ProtectRoute
            path='/dashboard/orders/create-order'
            component={CreateOrder}
          />{' '}
          <ProtectRoute
            path='/dashboard/orders/view'
            exact
            component={Orderview}
          />
          <ProtectRoute
            path='/dashboard/orders/view/add-item'
            component={ItemForm}
          />
          <ProtectRoute
            path='/dashboard/orders/view/load-pickup'
            component={LoadPickup}
          />
          <ProtectRoute
            path='/dashboard/orders/view/schedule-pickup'
            component={SchedulePickup}
          />
          <ProtectRoute
            path='/dashboard/orders/view/unload-pickup'
            component={UnloadPickup}
          />
          <ProtectRoute
            path='/dashboard/orders/view/shedule-dispatch'
            component={ScheduleDispatch}
          />
          <ProtectRoute
            path='/dashboard/orders/view/deliver-dispatch'
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
