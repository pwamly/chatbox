import React, { useMemo } from 'react';
import BranchDash from './Table/VehicleTable';
import Adduser from './VehicleForm';
import { connect } from 'react-redux';
import { ADD_USER } from '../../../actions';

function Index({ adduser }) {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {!adduser ? <BranchDash /> : <Adduser />}{' '}
    </div>
  );
}

const MapStateToprops = (store) => {
  return { ...store };
};
export default connect(MapStateToprops)(Index);
