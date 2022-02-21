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
import {
  addUser,
  additem,
  schedulePickup,
  scheduleBundleDispatch,
  editUser,
  getVehicles,
  getUsers,
  getDrivers,
  getTransporters,
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

  const theme = useTheme();
  const [pickdate, setPickdate] = useState(new Date().toGMTString());
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const { results: driverdata } = useGetList(getDrivers, { role: 'Driver' });
  const { results: vehicledata } = useGetList(getVehicles);
  const { results: transporterdata } = useGetList(getTransporters);
  const [seledrive, setSeledriver] = useState('');
  const [seletrans, setSeletrans] = useState('');
  const [selevehicle, setSelevehicle] = useState('');

  // ........... to be passed to form values ..........
  const formref = useRef();
  const pickupnotef = useRef();
  const pickdat = useRef('');

  // ......................... to be passed to the form default...........

  const history = useHistory();
  const { orderid, pickupnote, bundleid } = reportdata;

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

  async function handlesave() {
    try {
      if (saveedit == 'save') {
        setLoading(true);
        // formref.current.reset();
        let response = await scheduleBundleDispatch({
          orderid,
          dispatchnote: pickupnotef.current.value,
          dispatchDriverId: seledrive,
          dispatchvehicleId: selevehicle,
          transporterid: seletrans,
          scheduledDispatchtime: pickdate._i,
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

  const handleChangestrans = (event) => {
    const {
      target: { value },
    } = event;
    setSeletrans(value);
  };
  //................................... for date time ............

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
      <FormLabel>SCHEDULE DISPATCH</FormLabel>
      <Divider
        fullWidth
        style={{
          background: 'gray',
          marginTop: '10px',
          marginBottom: '30px',
          height: '30px',
        }}
      />
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        {/* <span style={{ width: '12%' }}>FROM : </span> */}
        <InputLabel id='demo-multiple-name-label'>
          SELECT TRANSPORTER
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
          {transporterdata.map((el) => (
            <MenuItem
              key={el.transporterid}
              value={el.transporterid}
              style={getStyles(transporterdata, seletrans, theme)}>
              {el.name}
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
        <InputLabel id='demo-multiple-name-label'>SELECT DRIVER</InputLabel>
        <Select
          labelId='demo-multiple-name-labelreg'
          id='demo-multiple-namereg'
          value={seledrive}
          label='helloo'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangesdriver}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {driverdata.map((el) => (
            <MenuItem
              key={el.userid}
              value={el.userid}
              style={getStyles(driverdata, seledrive, theme)}>
              {el.fname}
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
        <InputLabel id='demo-multiple-name-label'>SELECT VEHICLE</InputLabel>
        <Select
          labelId='demo-multiple-name-labelreg'
          id='demo-multiple-namere'
          value={selevehicle}
          label='helloo'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangesvehicle}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {vehicledata.map((el) => (
            <MenuItem
              key={el.vehicleid}
              value={el.name}
              style={getStyles(vehicledata, selevehicle, theme)}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5%' }}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                label='Dispatch-date'
                margin='normal'
                inputRef={pickdat}
                variant='outlined'
                autoComplete='off'
                fullWidth
                {...props}
              />
            )}
            label='Dispatch-date'
            value={pickdate}
            onChange={(newValue) => {
              setPickdate(newValue);
            }}
          />
        </LocalizationProvider>
      </div>

      <TextField
        multiline
        rows={3}
        maxRows={4}
        fullWidth
        label='NOTE'
        margin='normal'
        inputRef={pickupnotef}
        variant='outlined'
        autoComplete='off'
        defaultValue={pickupnote}
        ref={formref}
      />
      <Divider
        fullWidth
        style={{
          background: 'gray',
          marginTop: '10px',
          marginBottom: '30px',
          height: '30px',
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '70px',
        }}>
        <Button
          variant='contained'
          width='sm'
          color='primary'
          style={{ marginTop: '20px' }}
          onClick={handlesave}>
          {loading ? (
            <div style={spinerStyle}>
              <Spinner loading={loading} /> Loading...{' '}
            </div>
          ) : (
            `${saveeditbtn}`
          )}{' '}
        </Button>{' '}
        <Button
          variant='contained'
          width='sm'
          style={{ marginTop: '20px' }}
          onClick={() => {
            dispatch({ type: EXIT_ADD_FORM });
            history.goBack();
          }}>
          Close
        </Button>
      </div>
    </Card>
  );
}
const MapStateToprops = (store) => {
  return { ...store };
};

export default connect(MapStateToprops)(Regteam);
