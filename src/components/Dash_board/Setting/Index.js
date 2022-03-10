import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { ADD_USER } from '../../../actions';
import { ProtectRoute } from '../../ProtectRoute';
import BranchDash from './Table/Branchtable';
import View from './ViewDispatch/View';
import AddRegions from './ViewDispatch/AddRegion';
import ScheduleDispatch from './ViewDispatch/ScheduleDispatch';
import DeliverDispatch from './ViewDispatch/DeliverDispatch';
import Navbar from './Navbar';

import {
    Redirect,
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

function Index({ adduser }) {
    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
            <Router>
                <Navbar />
                <Switch>
                    <ProtectRoute
                        path="/dashboard/settings"
                        exact
                        component={BranchDash}
                    />{' '}
                    <ProtectRoute
                        path="/dashboard/settings/add-regions"
                        exact
                        component={AddRegions}
                    />
                    <ProtectRoute
                        path="/dashboard/bundles/schedule-dispatch"
                        exact
                        component={ScheduleDispatch}
                    />
                    <ProtectRoute
                        path="/dashboard/bundles/edit-bundle"
                        exact
                        component={AddRegions}
                    />
                    <ProtectRoute
                        path="/dashboard/bundles/deliver-dispatch"
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
