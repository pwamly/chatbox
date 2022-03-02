import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import './orderview.css';
import ItemModal from './ItemModal';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useGet, useGetList } from '../../../../hooks/index';
import { getItemByorder } from '../../../../client/client';
import { Divider } from '@mui/material';

function OrderViewF({ reportdata }) {
  const { orderid } = reportdata;

  const {
    results: rows,
    loading,
    refresh,
  } = useGetList(getItemByorder, { orderid });

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
              <h3 className='csngtitle'>From (Consignor)</h3>
              <div className='cdetails'>
                <h2 className='clabel'>Full Name:</h2>
                <span className='cvalue'>
                  {' '}
                  {reportdata.consignername ? reportdata.consignername : 'NA'}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Company Name:</h2>
                <span className='cvalue'>
                  {reportdata.customername ? reportdata.customername : 'NA'}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Physical Address:</h2>
                <span className='cvalue'>
                  {reportdata.cmpnaddress ? reportdata.cmpnaddress : 'NA'}
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
                <h2 className='clabel'>Pick Up Date:</h2>
                <span className='cvalue'>
                  {reportdata.pickuptime ? reportdata.pickuptime : 'NA'}
                </span>
              </div>
            </div>
            <div className='consignordetails'>
              <h1 className='csngtitle'>TO (Consignee)</h1>
              <div className='cdetails'>
                <h2 className='clabel'>Full Name:</h2>
                <span className='cvalue'>
                  {reportdata.consigneename ? reportdata.consigneename : 'NA'}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Company Name:</h2>
                <span className='cvalue'>
                  {' '}
                  {reportdata.customername ? reportdata.customername : 'NA'}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Physical Address:</h2>
                <span className='cvalue'>
                  {' '}
                  {reportdata.cneaddress ? reportdata.cneaddress : 'NA'}
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
                <h2 className='clabel'>EXP Delivery Date:</h2>

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
              justifyContent: 'flex-end',
              paddingBottom: '20px',
              paddingRight: '30px',
              gap: '30px',
            }}>
            {reportdata.orderStatus !== 'Delivered' && (
              <button
                style={{ width: '200px' }}
                onClick={() => {
                  history.push('/dashboard/deliver-order');
                }}>
                Delivered Order
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
              <h3 style={{ width: '30%' }}>Order Items</h3>
            </div>

            <div className='ordertable'>
              <div className='tr'>
                <div className='th'>
                  <h3>Item Type</h3>
                </div>
                <div className='thd'>
                  <h3>Description</h3>
                </div>
                <div className='th'>
                  <h3>Units</h3>
                </div>
                <div className='th'>
                  <h3>Weight in Kg</h3>
                </div>
                <div className='th'>
                  <h3>To be picked At</h3>
                </div>
                <div className='th'>
                  <h3>To be picked By</h3>
                </div>
                <div className='th'>
                  <h3>Vehicle</h3>
                </div>
                <div className='th'>
                  <h3>Status</h3>
                </div>
              </div>

              {rows.length !== 0 ? (
                rows.map((row, index) => (
                  <div className='tr' id={index}>
                    <div className='td'>{row.itemtype}</div>
                    <div className='tdd'>{row.note}</div>
                    <div className='td'>{row.units}</div>
                    <div className='td'>{row.weight}</div>
                    <div className='td'>{row.description}</div>
                    <div className='td'>{row.description}</div>
                    <div className='td'>{row.vehicledetails}</div>
                    <div className='td' style={statusColor(row.status)}>
                      {row.status}
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