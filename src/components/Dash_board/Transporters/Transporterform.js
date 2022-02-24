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
import { addUser, registerTransporter, editUser } from '../../../client/client';
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

  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  // ........... to be passed to form values ..........

  const formref = useRef();
  const tname = useRef('');
  const temail = useRef('');
  const tphone = useRef('');
  const taddress = useRef('');
  const troute = useRef('');
  const tdetails = useRef('');

  // ......................... to be passed to the form default...........

  const {
    name = '',
    vehicledetails = '',
    email = '',
    address = '',
    phone = '',
    route = '',
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
    console.log('fff', data, selector);
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
        let response = await registerTransporter({
          name: tname.current.value,
          email: temail.current.value,
          phone: tphone.current.value,
          address: taddress.current.value,
          route: troute.current.value,
          vehicledetails: tdetails.current.value,
        });

        if (response) {
          console.log(response);
          setLoading(false);
          addToast(' User Added successfully', {
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
      if (saveedit == 'edit') {
        setLoading(true);
        // formref.current.reset();
        let response = await editUser({
          name: tname.current.value,
          email: temail.current.value,
          phone: tphone.current.value,
          address: taddress.current.value,
          route: troute.current.value,
          vehicledetails: tdetails.current.value,
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
      <FormLabel>TRANSPORTER FORM</FormLabel>
      <Divider
        fullWidth
        style={{
          background: 'gray',
          marginTop: '10px',
          marginBottom: '30px',
          height: '30px',
        }}
      />{' '}
      <TextField
        label='Transporter Name'
        margin='normal'
        inputRef={tname}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={name}
        ref={formref}
      />{' '}
      <TextField
        label='Email'
        margin='normal'
        inputRef={temail}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={email}
        ref={formref}
      />{' '}
      <TextField
        label='Phone'
        margin='normal'
        inputRef={tphone}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={phone}
        ref={formref}
      />{' '}
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
        label='Address'
        margin='normal'
        inputRef={taddress}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={address}
        ref={formref}
      />
      <TextField
        label='Route'
        margin='normal'
        inputRef={troute}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={route}
        ref={formref}
      />{' '}
      <TextField
        label='Vehicle Details'
        margin='normal'
        inputRef={tdetails}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={vehicledetails}
        ref={formref}
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
          onClick={() => dispatch({ type: EXIT_ADD_FORM })}>
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
