import React, { useMemo } from 'react';
import Table from './Table/Branchtable';
import BranchDash from './Table/Branchtable';
import Adduser from './Orderform';
import { connect } from 'react-redux';
import { ADD_USER } from '../../../actions';
import { ProtectRoute } from '../../../components/ProtectRoute';
import Orderview from './ViewOrders/View';
import ItemForm from './ViewOrders/ItemModal';
import Assignbuddle from './ViewOrders/AssignBuddle';
import SchedulePickup from './ViewOrders/SchedulePickup';
import UnloadPickup from './ViewOrders/UnloadPickup';

import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

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
          <ProtectRoute path='/dashboard/orders' exact component={BranchDash} />{' '}
          <ProtectRoute
            path='/dashboard/orders/create-user'
            component={Adduser}
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
            component={Assignbuddle}
          />
          <ProtectRoute
            path='/dashboard/orders/view/schedule-pickup'
            component={SchedulePickup}
          />
          <ProtectRoute
            path='/dashboard/orders/view/unload-pickup'
            component={UnloadPickup}
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
