import React, { useMemo } from 'react';
import Table from './Table/Branchtable';
import BranchDash from './Table/Branchtable';
import Adduser from './Branch';
import { connect } from 'react-redux';
import { ADD_USER } from '../../../actions';

function Index({ adduser }) {
  return (
    <div style={{ height: '600px' }}>
      {!adduser ? <BranchDash /> : <Adduser />}{' '}
    </div>
  );
}
const MapStateToprops = (store) => {
  return { ...store };
};
export default connect(MapStateToprops)(Index);
