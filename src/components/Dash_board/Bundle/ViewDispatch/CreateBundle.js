import React, { useRef, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { useToasts } from 'react-toast-notifications';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Spinner from '../../../Spinner/Spiner';
import Select from '@material-ui/core/Select';
import { Link, useHistory } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import { ADD_USER, EXIT_ADD_FORM } from '../../../../actions';
import Checkbox from '@mui/material/Checkbox';
import {
  addUser,
  additem,
  schedulePickup,
  scheduleDispatch,
  editUser,
  getVehicles,
  getUsers,
  getDrivers,
  getTransporters,
  getBranches,
  getOrders,
  createBundle,
  updateBundle,
} from '../../../../client/client';
import { Divider } from '@mui/material';
import './order.css';
import { useGetList } from '../../../../hooks/index';

// ...................... for select ..............................

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputLabel as inputlabels } from '@mui/material/InputLabel';
import MenuItems from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Selects from '@mui/material/Select';

// .................... for select end.........................

//  import Textdate from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DateAdapter from '@mui/lab/AdapterMoment';

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

function getStyles(name, customerData, theme) {
  return {
    fontWeight:
      customerData.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
// ................. end for select

const spinerStyle = {
  display: 'flex',
  flexDirection: 'rows',
  gap: '12px',
};

function Regteam({ dispatch, branchdata, reportdata, saveedit, saveeditbtn }) {
  const style = { display: 'flex', flexDirection: 'row', fontWeight: 'bold' };

  // ........................... for select ..................

  const [orderlist, setOrderList] = useState([]);

  let listofOrders = [];

  const theme = useTheme();
  const [pickdate, setPickdate] = useState(new Date().toGMTString());
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  // const { results: driverdata } = useGetList(getDrivers, { role: 'Driver' });

  const { results: rowsdata } = useGetList(getOrders);

  const { results: branchdt } = useGetList(getBranches);
  const [seledrive, setSeledriver] = useState('');
  const [seletrans, setSeletrans] = useState('');
  const [selevehicle, setSelevehicle] = useState('');
  const { results: vehicledata } = useGetList(getBranches);
  const [to, setTo] = useState('');
  const [rows, setRows] = useState(rowsdata);
  // ........... to be passed to form values ..........
  const formref = useRef();
  const pickupnotef = useRef();
  const bundlenamef = useRef('');

  // ......................... to be passed to the form default...........

  const history = useHistory();
  const {
    orderid,
    pickupnote,
    bundlename,
    dregion,
    pregion,
    orderStatus,
    bundleid,
  } = reportdata;

  function selcust(data, selector) {
    console.log('', data, selector);
    let newdata = data.reduce((acc, item) => {
      if (item.customerId === selector) {
        acc.push(item);
      }
      return acc;
    }, []);
    return newdata[0];
  }

  const statusColor = {};
  async function handlesave() {
    try {
      if (saveedit == 'save') {
        setLoading(true);
        // formref.current.reset();
        let response = await createBundle({
          ordertobebundled: orderlist,
          bundlename: bundlenamef.current.value,
          bundleto: to,
        });

        if (response) {
          console.log(response);
          setLoading(false);
          addToast(' Item Added successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          return;
        }
        setLoading(false);
        addToast('Failed!', { appearance: 'error' });
        return;
      }
      if (saveedit == 'edit') {
        setLoading(true);
        // formref.current.reset();
        let response = await updateBundle({
          bundleid: bundleid,
          ordertobebundled: orderlist,
        });

        if (response) {
          console.log(response);
          setLoading(false);
          addToast(' User Updated successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          // window.location.replace(`/dashboard/employee`);
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

  //......................... for regions package............

  const handleChangesvehicle = (event) => {
    const {
      target: { value },
    } = event;
    setSelevehicle(value);
  };

  //......................... for districts package............

  const handleChangesdriver = (event) => {
    const {
      target: { value },
    } = event;
    setSeledriver(value);
  };

  function filterBranch(data, region) {
    let neworders = data.filter(function (el) {
      return el.dregion == region;
    });
    setRows(neworders);
    return neworders;
  }

  const handleChangestrans = (event) => {
    const {
      target: { value },
    } = event;
    setTo(value);
    setSeletrans(value);
    filterBranch(rowsdata, value);
  };

  function handlecheck(val, data) {
    if (val.ischecked) {
      listofOrders = [...orderlist, data];
      setOrderList(listofOrders);
    } else {
      listofOrders = orderlist.filter(function (returnableObjects) {
        return returnableObjects.orderid !== data.orderid;
      });
      setOrderList(listofOrders);
    }
  }
  //................................... for date time ............
  console.log('all data...................', orderlist);
  return (
    <Card
      variant='outlined '
      style={{
        fontFamily: 'sans-serif',
        minWidth: '300px',
        borderRadius: '16px',
        padding: '40px',
        width: '80%',
        height: 'auto',
        borderRadius: '16px',
        transition: '0.3s',
        margin: '20px',
      }}>
      <FormLabel> CREATE BUNDLE</FormLabel>
      <Divider
        fullWidth
        style={{
          background: 'gray',
          marginTop: '10px',
          marginBottom: '30px',
          height: '30px',
        }}
      />
      <TextField
        label='BUNDLE NAME'
        margin='normal'
        inputRef={bundlenamef}
        // disabled={1} for disabling fields
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={bundlename}
        ref={formref}
      />{' '}
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        {/* <span style={{ width: '12%' }}>FROM : </span> */}
        <InputLabel id='demo-multiple-name-label'>
          DESTINATION BRANCH
        </InputLabel>
        <Select
          labelId='demo-multiple-name-labelreg'
          id='demo-multiple-namereg'
          value={seletrans}
          label='helloo'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangestrans}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {branchdt.map((el) => (
            <MenuItem
              key={el.branchId}
              value={el.region}
              style={getStyles(branchdt, seletrans, theme)}>
              {el.branchname}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        {/* <span style={{ width: '12%' }}>FROM : </span> */}
      </div>
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        {/* <span style={{ width: '12%' }}>FROM : </span> */}
      </div>
      <div className='Orderdetails'>
        <div className='ordermaintitle'>
          <h3 style={{ width: '30%' }}>Orders</h3>
        </div>

        <div className='ordertable'>
          <div className='tr'>
            <div className='th'>
              <h3>SN</h3>
            </div>
            <div className='thd'>
              <h3>Description</h3>
            </div>

            <div className='th'>
              <h3>Total Units in KG</h3>
            </div>
            <div className='th'>
              <h3>To</h3>
            </div>

            <div className='th'>
              <h3>Select</h3>
            </div>
          </div>

          {rows.length !== 0 ? (
            rows.map((row, index) => (
              <div className='tr' id={index}>
                <div className='td'>{index + 1}</div>
                <div className='tdd'>{row.customernotes}</div>
                <div className='td'></div>
                <div className='td'>{row.dregion}</div>
                <div className='td'>
                  <Checkbox
                    id={index}
                    onChange={(e) => {
                      console.log(row);
                      handlecheck({ ischecked: e.target.checked }, row);
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '30px',
              }}>
              No Orders found for that destination
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
            `${saveeditbtn}`
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
            dispatch({ type: EXIT_ADD_FORM });
            history.goBack();
          }}>
          Close
        </button>
      </div>
    </Card>
  );
}
const MapStateToprops = (store) => {
  return { ...store };
};

export default connect(MapStateToprops)(Regteam);
