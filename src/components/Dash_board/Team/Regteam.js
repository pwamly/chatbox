import React, { useRef, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { useToasts } from "react-toast-notifications";
import TextField from "@material-ui/core/TextField";
import FormLabel from '@material-ui/core/FormLabel';
import Spinner from '../../Spinner/Spiner';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import { ADD_USER, EXIT_ADD_FORM } from '../../../actions';
import { addUser, editUser, getBranches } from '../../../client/client';
import { useGet, useGetList } from '../../../hooks/index';

// ...................... for select ..............................

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputLabel as inputlabels } from '@mui/material/InputLabel';
import MenuItems from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Selects from '@mui/material/Select';

const spinerStyle = {
  display: 'flex',
  flexDirection: 'rows',
  gap: '12px',
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

function getStyles(name, customerData, theme) {
  return {
    fontWeight:
      customerData.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

//......................... TODO to be shiped to the config file

const roles = [
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'Accountant',
  },
  {
    id: 3,
    name: 'Driver',
  },
  {
    id: 4,
    name: 'Sales',
  },
  {
    id: 5,
    name: 'IT',
  },
];



function validatePassword(pw) {
  console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', pw);
  return (
    /[A-Z]/.test(pw) &&
    /[a-z]/.test(pw) &&
    /[0-9]/.test(pw) &&
    /[^A-Za-z0-9]/.test(pw) &&
    pw.length > 7
  );
}

function Regteam({ adduser, teamdata, dispatch, saveedit, saveeditbtn }) {
  const style = { display: 'flex', flexDirection: 'row', fontWeight: 'bold' };
  const [usrbranch, setCng] = useState('');
  const [usrrole, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  // ........................... for select ..................

  const theme = useTheme();
  const [customerData, setcustomerData] = useState('');
  const [cData, setCData] = useState('');
  const [distdata, setDistdata] = useState('');
  const [selebranch, setSelebranch] = useState('');
  const [selerole, setSeleRole] = useState('');
  const [pickdate, setPickdate] = useState(new Date().toGMTString());
  const [deliverydat, setDeliverydate] = useState(new Date().toGMTString());
  const { results: branchdata } = useGetList(getBranches);

  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const formref = useRef();
  const fsname = useRef('');
  const lsname = useRef('');
  const usrphone = useRef('');
  const usremail = useRef('');
  const signature = useRef('');
  const usrpass = useRef('');
  const usrpassc = useRef('');

  const {
    fname = '',
    lname = '',
    phone = '',
    email = '',
    role = '',
    branchId = '',
    pass = '',
    userid = '',
  } = teamdata;
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

  // ................. for dropdeown..................

  async function handlesave() {
    if (
      (usrpass.current.value === '') |
      (usrphone.current.value === '') |
      (usremail.current.value === '') |
      (usrphone.current.value === '') |
      (selebranch == '') |
      (selerole == '')
    ) {
      setLoading(false);
      addToast('Fill all fields', {
        appearance: 'error',
        autoDismiss: true,
      });
      return;
    }
    try {
      if (saveedit == 'add') {
        setLoading(true);

        if (!validatePassword(usrpass.current.value)) {
          setLoading(false);
          addToast(' Password not strong', {
            appearance: 'error',
            autoDismiss: true,
          });

          return;
        } else {
          let response = await addUser({
            firstname: fsname.current.value,
            lastname: lsname.current.value,
            email: usremail.current.value,
            username: usremail.current.value,
            branchId: selebranch,
            role: selerole,
            phone: usrphone.current.value,
            password: usrpass.current.value,
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
      }
      if (saveedit == 'edit') {
        setLoading(true);
        // formref.current.reset();
        let response = await editUser({
          firstname: fsname.current.value,
          lastname: lsname.current.value,
          email: usremail.current.value,
          username: usremail.current.value,
          branch: usrbranch,
          role: usrrole,
          phone: usrphone.current.value,
          password: usrpass.current.value,
          userid: userid,
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

  //......................... for branch............

  const handleChangeBranch = (event) => {
    const {
      target: { value },
    } = event;

    setSelebranch(value);
  };

  //......................... for role............

  const handleChangeRole = (event) => {
    const {
      target: { value },
    } = event;

    setSeleRole(value);
  };

  return (
    <Card
      variant='outlined '
      style={{
        marginTop: '30px',
        position: 'relative',
        left: '50%',
        top: '50%',
        fontFamily: 'sans-serif',
        transform: 'translate(-50%, -50%)',
        width: '35%',
        minWidth: '80%',
        zIndex: '1',
        height: 'auto',
        borderRadius: '16px',
        padding: '20px',
        borderRadius: '16px',
        transition: '0.3s',
        // boxShadow: '0 8px 40px -12px rgba(0,0,0,0.4)',
        // '&:hover': {
        //   boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.4)',
        // },
      }}>
      <FormLabel>Employee Form</FormLabel>
      <TextField
        label='First Name '
        margin='normal'
        inputRef={fsname}
        variant='outlined'
        autoComplete='off'
        fullWidth
        ref={formref}
        defaultValue={fname}
      />{' '}
      <TextField
        label='Last Name '
        margin='normal'
        inputRef={lsname}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={lname}
        ref={formref}
      />{' '}
      <TextField
        label='Phone'
        margin='normal'
        inputRef={usrphone}
        variant='outlined'
        autoComplete='off'
        fullWidth
        ref={formref}
        defaultValue={phone}
      />{' '}
      <TextField
        label='Email'
        margin='normal'
        inputRef={usremail}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={email}
        ref={formref}
      />{' '}
      <TextField
        label='Password'
        margin='normal'
        inputRef={usrpass}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={pass}
        ref={formref}
      />
      {/* <TextField
        label='Comfirm Password'
        margin='normal'
        inputRef={usrpassc}
        variant='outlined'
        autoComplete='off'
        fullWidth
        ref={formref}
      /> */}
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        {/* <span style={{ width: '12%' }}>FROM : </span> */}
        <InputLabel id='demo-multiple-name-label'>BRANCH</InputLabel>
        <Select
          labelId='demo-multiple-name-labelreg'
          id='demo-multiple-namereg'
          value={selebranch}
          label='helloo'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangeBranch}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {branchdata.map((el) => (
            <MenuItem
              key={el.id}
              value={el.branchId}
              style={getStyles(branchdata, selebranch, theme)}>
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
        <InputLabel id='demo-multiple-name-label'>ROLE</InputLabel>
        <Select
          labelId='demo-multiple-name-labelreg'
          id='demo-multiple-namereg'
          value={selerole}
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangeRole}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {roles.map((el) => (
            <MenuItem
              key={el.id}
              value={el.name}
              style={getStyles(roles, selerole, theme)}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </div>{' '}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '70px',
        }}>
        {' '}
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
      <h4> </h4>
    </Card>
  );
}
const MapStateToprops = (store) => {
  return { ...store };
};

export default connect(MapStateToprops)(Regteam);
