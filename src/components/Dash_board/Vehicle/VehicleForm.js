import React, { useRef, useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { useToasts } from 'react-toast-notifications';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Spinner from '../../Spinner/Spiner';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import { ADD_USER, EXIT_ADD_FORM } from '../../../actions';
import { addUser, registerVehicle, editUser } from '../../../client/client';
import { Divider } from '@mui/material';
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

const statusd = [
  {
    value: 'working',
    name: 'WORKING',
  },
  {
    value: 'not working',
    name: 'NOT WORKING',
  },
];

const routestatusd = [
  {
    name: 'ON ROAD',
    value: 'on road',
  },
  {
    name: 'READY FOR PICK UP',
    value: 'available',
  },
];

const transTypesd = [
  {
    name: 'VEHICLE',
    value: 'vehicle',
  },

  {
    name: 'MOTORCYCLE',
    value: 'motorcycle',
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
// ................. end for select

const spinerStyle = {
  display: 'flex',
  flexDirection: 'rows',
  gap: '12px',
};

function Regteam({
  adduser,
  teamdata,
  dispatch,
  branchdata,
  saveedit,
  saveeditbtn,
}) {
  const style = { display: 'flex', flexDirection: 'row', fontWeight: 'bold' };
  const [usrbranch, setCng] = useState('');
  const [usrrole, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  // ........................... for select ..................

  const theme = useTheme();
  const [routestat, setRoutestat] = useState('');
  const [stat, setStatus] = useState('');
  const [transtype, setTranstype] = useState('');
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  // ........... to be passed to form values ..........

  const formref = useRef();
  const vname = useRef('');
  const pnumber = useRef('');
  const imodel = useRef('');
  const lcapacity = useRef('');
  const vdetails = useRef('');

  // ......................... to be passed to the form default...........

  const {
    name = '',
    plateno = '',
    model = '',
    loadcapacity = '',
    details = '',
  } = branchdata;
  const handleChange = (event) => {
    setCng(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleChange2 = (event) => {
    setRole(event.target.value);
  };

  function selcust(data, selector) {
    let newdata = data.reduce((acc, item) => {
      if (item.customerId === selector) {
        acc.push(item);
      }
      return acc;
    }, []);
    return newdata[0];
  }

  function selcons(data, selector) {
    let newdata = data.reduce((acc, item) => {
      if (item.consignerid === selector) {
        acc.push(item);
      }
      return acc;
    }, []);
    return newdata[0];
  }

  async function handlesave() {
    try {
      if (saveedit == 'add') {
        setLoading(true);
        // formref.current.reset();
        let response = await registerVehicle({
          name: vname.current.value,
          plateno: pnumber.current.value,
          model: imodel.current.value,
          loadcapacity: lcapacity.current.value,
          status: stat,
          routestatus: routestat,
          type: transtype,
        });

        if (response) {
          console.log(response);
          setLoading(false);
          addToast(' User Added successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          dispatch({ type: EXIT_ADD_FORM });
          return;
        }
        setLoading(false);
        addToast('Updated!', { appearance: 'warning' });
        return;
      }
      if (saveedit == 'edit') {
        setLoading(true);
        // formref.current.reset();
        let response = await editUser({
          name: vname.current.value,
          plateno: pnumber.current.value,
          model: imodel.current.value,
          loadcapacity: lcapacity.current.value,
          status: stat,
          routestatus: routestat,
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

  //......................... for regions............

  const handleChangesStatus = (event) => {
    const {
      target: { value },
    } = event;
    setStatus(value);
  };

  const handleChangesroutestatus = (event) => {
    const {
      target: { value },
    } = event;
    setRoutestat(value);
  };

  //......................... for trans............

  const handleChangeTransType = (event) => {
    const {
      target: { value },
    } = event;
    setTranstype(value);
  };

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
      <FormLabel>TRANSPORT FORM</FormLabel>
      <Divider
        fullWidth
        style={{
          background: 'red',
          marginTop: '10px',
          marginBottom: '30px',
          height: '30px',
        }}
      />{' '}
      <TextField
        label='Vehicle Name'
        margin='normal'
        inputRef={vname}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={name}
        ref={formref}
      />
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        <InputLabel id='demo-multiple-name-label'>Transport Type</InputLabel>
        <Select
          labelId='demo-multiple-name-labelreg'
          id='demo-multiple-namereg'
          value={transtype}
          label='helloo'
          defaultValue='Mwanza'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangeTransType}
          MenuProps={MenuProps}>
          {transTypesd.map((el) => (
            <MenuItem
              key={el.name}
              value={el.value}
              style={getStyles(transTypesd, transtype, theme)}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <TextField
        label='Plate Number'
        margin='normal'
        inputRef={pnumber}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={plateno}
        ref={formref}
      />{' '}
      <TextField
        label='Model'
        margin='normal'
        inputRef={imodel}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={model}
        ref={formref}
      />{' '}
      <TextField
        label='Load Capacity'
        margin='normal'
        inputRef={lcapacity}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={loadcapacity}
        ref={formref}
      />{' '}
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        {/* <span style={{ width: '12%' }}>FROM : </span> */}
        <InputLabel id='demo-multiple-name-label'>Status</InputLabel>
        <Select
          labelId='demo-multiple-name-labelreg'
          id='demo-multiple-namereg'
          value={stat}
          label='helloo'
          defaultValue='Mwanza'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangesStatus}
          MenuProps={MenuProps}>
          {statusd.map((el) => (
            <MenuItem
              key={el.name}
              value={el.value}
              style={getStyles(statusd, stat, theme)}>
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
        <InputLabel id='demo-multiple-name-label'>Route Status</InputLabel>
        <Select
          labelId='demo-multiple-name-label2'
          id='demo-multiple-name2'
          value={routestat}
          label='helloo'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangesroutestatus}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {routestatusd.map((el) => (
            <MenuItem
              key={el.consignerid}
              value={el.value}
              style={getStyles(routestatusd, routestat, theme)}>
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
        }}></div>
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}></div>
      <TextField
        label='Vehicle Details'
        margin='normal'
        inputRef={vdetails}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={details}
        ref={formref}
      />
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
          onClick={() => dispatch({ type: EXIT_ADD_FORM })}>
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
