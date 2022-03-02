import React, { useRef, useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import './orderview.css';
import ItemModal from './ItemModal';
import { useToasts } from 'react-toast-notifications';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useGet, useGetList } from '../../../../hooks/index';
import { getItemByorder } from '../../../../client/client';
import MenuItem from '@material-ui/core/MenuItem';
import { Divider } from '@mui/material';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Spinner from '../../../Spinner/Spiner';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { addUser, additem, editUser } from '../../../../client/client';
import { ADD_USER, EXIT_ADD_FORM } from '../../../../actions';
import { FaEye, FaRegEye, FaTrash, FaPrint } from 'react-icons/fa';
import { ImPencil } from 'react-icons/im';

// ...................... for select ..............................

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputLabel as inputlabels } from '@mui/material/InputLabel';
import MenuItems from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Selects from '@mui/material/Select';

function OrderViewF({ reportdata, saveedit, saveeditbtn, dispatch }) {
  // ........... to be passed to form values ..........
  const formref = useRef();
  const itemnamef = useRef();
  const unitsf = useRef();
  const weightf = useRef();
  const notef = useRef();
  const history = useHistory();

  const { orderid, itemname, itemtype, units, weight, note } = reportdata || {};

  const { results: rows, refresh } = useGetList(getItemByorder, { orderid });

  const [itmelist, setItemlist] = useState([]);

  const statusColor = (status) => {
    let color = 'none';
    if (status == 'not picked') {
      color = 'none';
    }
    if (status == 'picked') {
      color = 'none';
    }
    if (status == 'picked and unloaded') {
      color = 'rgb(191, 240, 94)';
    }
    if (status == 'delivered') {
      color = 'none';
    }

    return { background: color };
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 300,
      },
    },
  };

  const spinerStyle = {
    display: 'flex',
    flexDirection: 'rows',
    gap: '12px',
  };

  const items = [
    {
      id: 1,
      name: 'Box',
    },
    {
      id: 2,
      name: 'Parcel	',
    },
  ];

  function getStyles(name, customerData, theme) {
    return {
      fontWeight:
        customerData.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  function handleadditem() {
    if (
      itemnamef.current.value &&
      unitsf.current.value &&
      weightf.current.value &&
      notef.current.value
    ) {
      setItemlist([
        ...itmelist,
        {
          itemname: itemnamef.current.value,
          units: unitsf.current.value,
          weight: weightf.current.value,
          note: notef.current.value,
          itemtype: itemtypef,
        },
      ]);
      itemnamef.current.value = '';
      unitsf.current.value = '';
      weightf.current.value = '';
      notef.current.value = '';
      setItemtype('');
    } else {
      addToast(' Fill all the fields!!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }

  function handledelete(value) {
    const newarray = itmelist.filter(function (returnableObjects) {
      return returnableObjects !== value;
    });
    setItemlist(newarray);
  }

  async function handlesave() {
    try {
      if (saveedit == 'save') {
        setLoading(true);
        // formref.current.reset();
        let response = await additem({
          orderid: orderid,
          items: itmelist,
        });

        if (response) {
          console.log(response);
          setLoading(false);
          addToast(' Item Added successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          history.push(`/dashboard/orders`);
          return;
        }
        setLoading(false);
        addToast('Failed!', { appearance: 'error' });
        return;
      }
      if (saveedit == 'edit') {
        setLoading(true);
        // formref.current.reset();
        let response = await editUser({});

        if (response) {
          console.log(response);
          setLoading(false);
          addToast(' User Updated successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          return;
        }
        setLoading(false);
        addToast('Updated!', { appearance: 'warning' });
        return;
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      addToast('Failed', { appearance: 'error' });
    }
  }

  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setcustomerData(value);
  };

  //......................... for customers............

  const handleChangesc = (event) => {
    const {
      target: { value },
    } = event;
    setCData(value);
  };

  //......................... for regions............

  const handleChangesitemtype = (event) => {
    const {
      target: { value },
    } = event;

    setItemtype(value);
  };

  //......................... for districts............

  //......................... for regions package............

  const handleChangesvehicle = (event) => {
    const {
      target: { value },
    } = event;
    setRegtdatap(value);
  };

  //......................... for districts package............

  const handleChangesdriver = (event) => {
    const {
      target: { value },
    } = event;
    setDriver(value);
  };

  //................................... for date time ............

  // const { results: rows, loading, refresh } = useGet('');
  // const { addToast } = useToasts();
  const [additemform, setAdditem] = useState(false);

  // ........................... for select ..................

  const theme = useTheme();
  const [customerData, setcustomerData] = useState('');
  const [cData, setCData] = useState('');
  const [distdata, setDistdata] = useState('');
  const [itemtypef, setItemtype] = useState('');
  const [driver, setDriver] = useState('');
  const [regdatap, setRegtdatap] = useState('');
  const [pickdate, setPickdate] = useState(new Date().toGMTString());
  const [deliverydat, setDeliverydate] = useState(new Date().toGMTString());
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

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
                  {reportdata.consignername ? reportdata.consignername : ''}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Company Name:</h2>
                <span className='cvalue'>
                  {reportdata.customername ? reportdata.customername : ''}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Physical Address:</h2>
                <span className='cvalue'>
                  {reportdata.cmpnaddress ? reportdata.cmpnaddress : ''}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Email Address:</h2>
                <span className='cvalue'>
                  {' '}
                  {reportdata.cnremail ? reportdata.cnremail : ''}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Phone Number:</h2>
                <span className='cvalue'>
                  {' '}
                  {reportdata.cnrphone ? reportdata.cnrphone : ''}
                </span>
              </div>{' '}
              <div className='cdetails'>
                <h2 className='clabel'>Pick Up Date:</h2>
                <span className='cvalue'>
                  {reportdata.pickuptime ? reportdata.pickuptime : ''}
                </span>
              </div>
            </div>
            <div className='consignordetails'>
              <h1 className='csngtitle'>TO (Consignee)</h1>
              <div className='cdetails'>
                <h2 className='clabel'>Full Name:</h2>
                <span className='cvalue'>
                  {reportdata.consigneename ? reportdata.consigneename : ''}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Company Name:</h2>
                <span className='cvalue'>
                  {' '}
                  {reportdata.customername ? reportdata.customername : ''}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Physical Address:</h2>
                <span className='cvalue'>
                  {' '}
                  {reportdata.cneaddress ? reportdata.cneaddress : ''}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Email Address:</h2>
                <span className='cvalue'>
                  {reportdata.cgnemail ? reportdata.cgnemail : ''}
                </span>
              </div>
              <div className='cdetails'>
                <h2 className='clabel'>Phone Number:</h2>
                <span className='cvalue'>
                  {reportdata.cneemail ? reportdata.cneemail : ''}
                </span>
              </div>{' '}
              <div className='cdetails'>
                <h2 className='clabel'>EXP Delivery Date:</h2>

                <span className='cvalue'>
                  {' '}
                  {reportdata.expdlrtime ? reportdata.expdlrtime : ''}
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
              gap: '20px',
              paddingRight: '20px',
            }}>
            {!reportdata.pickupScheduled && !reportdata.itemsAdded && (
              <button
                className='btn btn-primary'
                style={{
                  width: '14%',
                  fontWeight: 'bold',
                  background: 'red',
                  color: 'white',
                  height: '30px',
                  borderRadius: '6px',
                }}
                onClick={() => {
                  setAdditem(true);
                }}>
                Add Items
              </button>
            )}
            {!reportdata.pickupScheduled && reportdata.itemsAdded && (
              <button
                className='btn btn-primary'
                style={{
                  width: '17%',
                  fontWeight: 'bold',
                  color: 'white',
                  background: 'red',
                  borderRadius: '6px',
                }}
                onClick={() => {
                  history.push('/dashboard/orders/view/schedule-pickup');
                }}>
                Schedule Pickup
              </button>
            )}
            {!reportdata.pickupLoaded && reportdata.pickupScheduled && (
              <button
                className='btn btn-primary'
                style={{
                  width: '15%',
                  fontWeight: 'bold',
                  background: 'red',
                  borderRadius: '6px',
                }}
                onClick={() => {
                  history.push('/dashboard/orders/view/load-pickup');
                }}>
                Load pickup
              </button>
            )}
            {!reportdata.pickupUnloaded && reportdata.pickupLoaded && (
              <button
                className='btn btn-primary'
                style={{
                  width: '13%',
                  fontWeight: 'bold',
                  background: 'red',
                  borderRadius: '6px',
                }}
                onClick={() => {
                  history.push('/dashboard/orders/view/unload-pickup');
                }}>
                Unload Item
              </button>
            )}{' '}
            {!reportdata.dispatchScheduled && reportdata.pickupUnloaded && (
              <button
                className='btn btn-primary'
                style={{
                  width: '18%',
                  fontWeight: 'bold',
                  background: 'red',
                  borderRadius: '6px',
                }}
                onClick={() => {
                  history.push('/dashboard/orders/view/shedule-dispatch');
                }}>
                Schedule Dispatch
              </button>
            )}
            {reportdata.orderStatus !== 'Dispatched' &&
              reportdata.dispatchScheduled && (
                <button
                  className='btn btn-primary'
                  style={{
                    width: '18%',
                    background: 'red',
                    fontWeight: 'bold',
                    borderRadius: '6px',
                  }}
                  onClick={() => {
                    history.push('/dashboard/orders/view/deliver-dispatch');
                  }}>
                  Deliver Dispatch
                </button>
              )}
          </div>
          <Divider
            fullWidth
            style={{
              background: 'red',
              height: '30px',
            }}
          />
          {additemform ? (
            <div style={{ padding: '5px' }}>
              <FormLabel>ITEM FORM</FormLabel>
              <div
                style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                <div
                  style={{
                    marginTop: '0px',
                    width: '30%',
                    gap: '5%',
                  }}>
                  <InputLabel id='demo-multiple-name-label'></InputLabel>
                  <TextField
                    label='ITEM NAME'
                    margin='normal'
                    inputRef={itemnamef}
                    variant='outlined'
                    autoComplete='off'
                    fullWidth
                    defaultValue={itemname}
                    ref={formref}
                  />{' '}
                </div>
                <div
                  style={{
                    marginTop: '10px',
                    width: '10%',
                    gap: '5%',
                  }}>
                  {/* <span style={{ width: '12%' }}>FROM : </span> */}
                  <InputLabel id='demo-multiple-name-label'>
                    ITEM TYPE
                  </InputLabel>
                  <Select
                    labelId='demo-multiple-name-labelreg'
                    id='demo-multiple-namereg'
                    value={itemtypef}
                    label='helloo'
                    fullWidth
                    onChange={handleChangesitemtype}
                    input={<OutlinedInput label='Name'></OutlinedInput>}
                    MenuProps={MenuProps}>
                    {items.map((el) => (
                      <MenuItem
                        key={el.id}
                        value={el.name}
                        style={getStyles(items, itemtypef, theme)}>
                        {el.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <TextField
                  label='UNITS'
                  margin='normal'
                  inputRef={unitsf}
                  style={{ width: '10%' }}
                  variant='outlined'
                  autoComplete='off'
                  fullWidth
                  defaultValue={units}
                  ref={formref}
                />{' '}
                <TextField
                  label='WEIGHT IN KG'
                  margin='normal'
                  inputRef={weightf}
                  style={{ width: '15%' }}
                  variant='outlined'
                  autoComplete='off'
                  fullWidth
                  defaultValue={weight}
                  ref={formref}
                />{' '}
                <TextField
                  multiline
                  rows={1}
                  maxRows={4}
                  fullWidth
                  label='DESCRIPTION'
                  margin='normal'
                  style={{ width: '55%' }}
                  inputRef={notef}
                  variant='outlined'
                  autoComplete='off'
                  defaultValue={note}
                  ref={formref}
                />
                <button
                  variant='contained'
                  className='btn-havor'
                  style={{
                    marginTop: '20px',
                    width: '100px',
                    background: 'red',
                    color: 'white',
                    height: '30px',
                    borderRadius: '6px',
                  }}
                  onClick={() => {
                    handleadditem();
                  }}>
                  Add
                </button>
              </div>

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
                      <h3>Actions</h3>
                    </div>
                  </div>

                  {itmelist.length !== 0 ? (
                    itmelist.map((row, index) => (
                      <div className='tr' id={index}>
                        <div className='td'>{row.itemtype}</div>
                        <div className='tdd'>{row.note}</div>
                        <div className='td'>{row.units}</div>
                        <div className='td'>{row.weight}</div>
                        <div className='td'>{row.scheduledPickuptime}</div>
                        <div className='td'>{row.description}</div>
                        <div className='td'>{row.vehicledetails}</div>
                        <div className='td' style={statusColor(row.status)}>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              gap: '15px',
                              justifyContent: 'center',
                            }}>
                            <FaTrash
                              id='trash'
                              className='IconStyle'
                              onClick={() => {
                                handledelete(row);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '50px',
                        fontSize: '16px',
                      }}>
                      <span>No data available</span>
                    </div>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: '70px',
                }}>
                <button
                  variant='contained'
                  className='btn-havor'
                  style={{
                    marginTop: '20px',
                    width: '200px',
                    background: 'red',
                    color: 'white',
                    height: '30px',
                    borderRadius: '6px',
                  }}
                  onClick={handlesave}>
                  {loading ? (
                    <div style={spinerStyle}>
                      <Spinner loading={loading} /> Loading...{' '}
                    </div>
                  ) : (
                    `Submint`
                  )}{' '}
                </button>{' '}
                <button
                  variant='contained'
                  className='btn-havor'
                  style={{
                    marginTop: '20px',
                    width: '200px',
                    background: 'red',
                    color: 'white',
                    height: '30px',
                    borderRadius: '6px',
                  }}
                  onClick={() => {
                    setAdditem(false);
                  }}>
                  Close
                </button>
              </div>
            </div>
          ) : (
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
                      <div className='td'>{row.scheduledPickuptime}</div>
                      <div className='td'>{row.driverId}</div>
                      <div className='td'>{row.vehicledetails}</div>
                      <div className='td' style={statusColor(row.status)}>
                        {row.status}
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '50px',
                      fontSize: '16px',
                    }}>
                    <span>No data available</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

const MapStateToprops = (store) => {
  return { ...store };
};

export default connect(MapStateToprops)(OrderViewF);
