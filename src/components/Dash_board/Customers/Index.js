import React, { useMemo } from 'react';
import BranchDash from './Table/Customertable';
import CustomerForm from './Customerform';
import CustomerView from './CustomerView/CustomerView';
import Consigner from './CustomerView/CustomerModal';
import { connect } from 'react-redux';
import { ADD_USER } from '../../../actions';
import {
  Redirect,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { ProtectRoute } from '../../../components/ProtectRoute';

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
            path='/dashboard/customers'
            exact
            component={BranchDash}
          />
          <ProtectRoute
            path='/dashboard/customers/create-customer'
            component={CustomerForm}
          />
          <ProtectRoute
            path='/dashboard/customers/view'
            exact
            component={CustomerView}
          />
          <ProtectRoute
            path='/dashboard/customers/edit'
            component={CustomerForm}
          />
          <ProtectRoute
            path='/dashboard/customers/add-consignor'
            component={Consigner}
          />
        </Switch>
      </Router>
      {/* {!adduser ? <BranchDash /> : <Adduser />}{' '} */}
    </div>
  );
}

const MapStateToprops = (store) => {
  return { ...store };
};
export default connect(MapStateToprops)(Index);
