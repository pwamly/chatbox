import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import './customer.css';
import ItemModal from './CustomerModal';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaEye, FaRegEye, FaTrash, FaPrint } from 'react-icons/fa';
import { useGet, useGetList } from '../../../../hooks/index';
import { ImPencil } from 'react-icons/im';
import { getconsignors } from '../../../../client/client';

function OrderView({ reportdata }) {
  const data = [];
  const { customerid } = reportdata;
  const history = useHistory();
  const {
    results: rows,
    loading,
    refresh,
  } = useGetList(getconsignors, { customerid });


  return (
    <>
      {/* <div className='modalItem'>
        {' '}
        <ItemModal />
      </div> */}

      <Container
        style={{
          height: '100hv',
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          // background: 'green',
        }}>
        <div className='customerview'>
          <spa className='top-head'>
            <h2>Customer details</h2>
          </spa>
          <div className='consignordetails'>
            <div className='cdetails'>
              <h2 className='clabel'>Full Name:</h2>
              <span className='cvalue'>
                {' '}
                {reportdata.fname
                  ? reportdata.fname + '  -  ' + reportdata.lname
                  : 'NA'}
              </span>
            </div>
            <div className='cdetails'>
              <h2 className='clabel'>Email Address:</h2>
              <span className='cvalue'>
                {' '}
                {reportdata.email ? reportdata.email : 'NA'}
              </span>
            </div>
            <div className='cdetails'>
              <h2 className='clabel'>Phone Number:</h2>
              <span className='cvalue'>
                {' '}
                {reportdata.phone ? reportdata.phone : 'NA'}
              </span>
            </div>{' '}
            <div className='cdetails'>
              <h2 className='clabel'>Physical Address:</h2>
              <span className='cvalue'>
                {reportdata.generaladdress ? reportdata.generaladdress : 'NA'}
              </span>
            </div>
            <div className='cdetails'>
              <h2 className='clabel'>Created At:</h2>
              <span className='cvalue'>
                {reportdata.created ? reportdata.created : 'NA'}
              </span>
            </div>
          </div>
          <spa className='top-head'>
            <h2 className='toptitle'>Consignor details</h2>
            <div className='addconsignor'>
              <button
                className='addcnrbtn'
                onClick={() =>
                  history.push('/dashboard/customers/add-consignor')
                }>
                Add Consignor
              </button>
            </div>
          </spa>

          <div className='customerdetails'>
            <div className='ordertable'>
              <div className='tr'>
                <div className='th'>
                  <h3>SN</h3>
                </div>
                <div className='thd'>
                  <h3>Name</h3>
                </div>
                <div className='th'>
                  <h3>Email</h3>
                </div>
                <div className='th'>
                  <h3>Phone</h3>
                </div>

                <div className='th'>
                  <h3>NIDA</h3>
                </div>
              </div>
              {rows.length !== 0 ? (
                rows.map((row, index) => (
                  <div className='tr' id={index}>
                    <div className='td'>{index + 1}</div>
                    <div className='td'>{row.fullname}</div>
                    <div className='td'>{row.email}</div>
                    <div className='td'>{row.phone}</div>
                    <div className='td'>{row.nidano}</div>
                  </div>
                ))
              ) : (
                <div className='tr'>
                  <div className='td'>0</div>
                  <div className='tdd'>NA</div>
                  <div className='td'>NA</div>
                  <div className='td'>NA</div>
                  <div className='td'>NA</div>
                  <div className='td'>NA</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const MapStateToprops = (store) => {
  return { ...store };
};

export default connect(MapStateToprops)(OrderView);
