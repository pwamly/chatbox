import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import './orderview.css';
import ItemModal from './ItemModal';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useGet, useGetList } from '../../../../hooks/index';
import { useToasts } from 'react-toast-notifications';

import {
  getItemByorder,
  getOrders,
  deliverbundle,
  getBundledOrders,
} from '../../../../client/client';
import { Divider } from '@mui/material';

import {
  ADD_USER,
  EDIT_USER,
  CLEAR_PROFILE_DATA,
  SAVE_REPORT_DATA,
  SAVE_BRANCH_DATA,
  CLEAR_BRANCH_DATA,
  EDIT_BUNDLE_DATA,
} from '../../../../actions';

function OrderViewF({ reportdata, dispatch }) {
  const { addToast } = useToasts();

  const { bundleid } = reportdata;
  const [loading, setLoading] = useState(false);

  const { results: rows, refresh } = useGetList(getBundledOrders, {
    bundleid: bundleid,
  });

  function delay(delayInms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }

  async function handledeliver() {
    setLoading(true);
    // formref.current.reset();
    let response = await deliverbundle({
      bundleid: bundleid,
    });

    if (response) {
      console.log(response);
      setLoading(false);
      addToast(' Item Added successfully', {
        appearance: 'success',
        autoDismiss: true,
      });
      // window.location.replace(`/dashboard/employee`);
      return;
    }
    setLoading(false);
    addToast('Failed!', { appearance: 'error' });
    return;
  }

  const statusColor = (status) => {
    let color = 'none';
    if (status == 'not picked') {
      color = 'red';
    }
    if (status == 'picked') {
      color = 'yellow';
    }
    if (status == 'picked and unloaded') {
      color = 'rgb(191, 240, 94)';
    }
    if (status == 'delivered') {
      color = 'green';
    }

    return { background: color };
  };

  const history = useHistory();
  // const { results: rows, loading, refresh } = useGet('');
  // const { addToast } = useToasts();
  const [loadingdel, setLoadingdel] = useState(false);

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
        <div className='orderview'>
          <div className='head'>
            <span className='logopreview'>SGA</span>
            <span
              className='hedend'
              style={{
                // background: 'red',
                padding: '20px',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <span className='toprighttitle'>
                Head Office <br />
                www.sgasecurity.com
              </span>
            </span>
          </div>
          <div className='toform'>
            <div className='consignordetails'>
              <h3 className='csngtitle'>From (Branch)</h3>
              <div className='cdetails'>
                <h2 className='clabel'>Branch Name:</h2>
                <span className='cvalue'>
                  {' '}
                  {reportdata.consignername ? reportdata.consignername : 'NA'}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Email Address:</h2>
                <span className='cvalue'>
                  {' '}
                  {reportdata.cnremail ? reportdata.cnremail : 'NA'}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Phone Number:</h2>
                <span className='cvalue'>
                  {' '}
                  {reportdata.cnrphone ? reportdata.cnrphone : 'NA'}
                </span>
              </div>{' '}
              <div className='cdetails'>
                <h2 className='clabel'>Bundle Dispatch Date:</h2>

                <span className='cvalue'>
                  {' '}
                  {reportdata.expdlrtime ? reportdata.expdlrtime : 'NA'}
                </span>
              </div>
            </div>
            <div className='consignordetails'>
              <h1 className='csngtitle'>TO (Branch)</h1>
              <div className='cdetails'>
                <h2 className='clabel'>Branch Name:</h2>
                <span className='cvalue'>
                  {reportdata.consigneename ? reportdata.consigneename : 'NA'}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Email Address:</h2>
                <span className='cvalue'>
                  {reportdata.cgnemail ? reportdata.cgnemail : 'NA'}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Phone Number:</h2>
                <span className='cvalue'>
                  {reportdata.cneemail ? reportdata.cneemail : 'NA'}
                </span>
              </div>{' '}
              <div className='cdetails'>
                <h2 className='clabel'>Bundle Dispatch Date Delivery Date:</h2>

                <span className='cvalue'>
                  {' '}
                  {reportdata.expdlrtime ? reportdata.expdlrtime : 'NA'}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              width: '100%',
              paddingTop: '30px',
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '20px',
              gap: '30px',
            }}>
            {!reportdata.dispatchScheduled && (
              <button
                style={{ width: '120px' }}
                onClick={() => {
                  history.push('/dashboard/bundles/schedule-dispatch');
                  dispatch({
                    type: SAVE_REPORT_DATA,
                    payload: { bundleid: bundleid },
                  });
                }}>
                Schedule Dispatch
              </button>
            )}
            {reportdata.orderStatus !== 'Dispatched' && (
              <button
                style={{ width: '100px' }}
                onClick={() => {
                  handledeliver();
                }}>
                Deliver Dispatch
              </button>
            )}
          </div>
          <Divider
            fullWidth
            style={{
              background: 'gray',
              height: '30px',
            }}
          />
          <div className='Orderdetails'>
            <div className='ordermaintitle'>
              <h3 style={{ width: '30%' }}>Orders</h3>
            </div>

            <div className='ordertable'>
              <div className='tr'>
                <div className='th'>
                  <h3>Customer Name</h3>
                </div>
                <div className='thd'>
                  <h3>Package Location</h3>
                </div>
                <div className='th'>
                  <h3>Consignor Name</h3>
                </div>
                <div className='th'>
                  <h3>Destination</h3>
                </div>
                <div className='th'>
                  <h3>Consignee</h3>
                </div>
                <div className='th'>
                  <h3>Dispatch Date</h3>
                </div>
                <div className='th'>
                  <h3>Expected Delivered Date</h3>
                </div>
                <div className='th'>
                  <h3>Status</h3>
                </div>
              </div>

              {rows.length !== 0 ? (
                rows.map((row, index) => (
                  <div className='tr' id={index}>
                    <div className='td'>{row.customername}</div>
                    <div className='tdd'>{row.pregion}</div>
                    <div className='td'>{row.consignername}</div>
                    <div className='td'>{row.dregion}</div>
                    <div className='td'>{row.consigneename}</div>
                    <div className='td'>{row.scheduledDispatchtime}</div>
                    <div className='td'>{row.expdlrtime}</div>
                    <div className='td' style={statusColor(row.orderStatus)}>
                      {row.orderStatus}
                    </div>
                  </div>
                ))
              ) : (
                <div className='tr'>
                  <div className='td'>NA</div>
                  <div className='tdd'>NA</div>
                  <div className='td'>NA</div>
                  <div className='td'>NA</div>
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

export default connect(MapStateToprops)(OrderViewF);