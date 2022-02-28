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
import { addUser, addBranch, updateBranch } from '../../../client/client';

import {
  getUsers,
  getCustomers,
  getconsignors,
  getRegions,
} from '../../../client/client';
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

function getStyles(name, customerId, theme) {
  return {
    fontWeight:
      customerId.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

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
  const [regdatap, setRegtdatap] = useState('');
  const { results: rowz } = useGetList(getRegions);
  const theme = useTheme();

  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  // ........... to be passed to form values ..........

  const formref = useRef();
  const bname = useRef('');
  const bregion = useRef('');
  const bdistrict = useRef('');
  const baddress = useRef('');
  const bid = useRef('');

  const {
    branchname = '',
    region = '',
    district = '',
    branchaddress = '',
    branchId = '',
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

  //......................... for regions package............

  const handleChangesregp = (event) => {
    const {
      target: { value },
    } = event;
    setRegtdatap(value);
  };

  async function handlesave() {
    try {
      if (saveedit == 'add') {
        setLoading(true);
        // formref.current.reset();
        let response = await addBranch({
          branchId: bid.current.value,
          branchaddress: baddress.current.value,
          branchname: bname.current.value,
          region: regdatap,
        });

        if (response) {
          console.log(response);
          setLoading(false);
          addToast(' Branch Added successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          // window.location.replace(`/dashboard/employee`);
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
        let response = await updateBranch({
          branchId: branchId,
          branchaddress: baddress.current.value,
          branchname: bname.current.value,
          region: regdatap,
        });

        if (response) {
          console.log(response);
          setLoading(false);
          addToast(' Branch Updated successfully', {
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
        maxWidth: 300,
        padding: '20px',
        borderRadius: '16px',
        transition: '0.3s',
        // boxShadow: '0 8px 40px -12px rgba(0,0,0,0.4)',
        // '&:hover': {
        //   boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.4)',
        // },
      }}>
      <FormLabel>BRANCH FORM</FormLabel>
      <TextField
        label='Branch ID'
        margin='normal'
        inputRef={bid}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={branchId}
        ref={formref}
      />{' '}
      <TextField
        label='Branch Name '
        margin='normal'
        inputRef={bname}
        variant='outlined'
        autoComplete='off'
        fullWidth
        ref={formref}
        defaultValue={branchname}
      />{' '}
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        {/* <span style={{ width: '12%' }}>FROM : </span> */}
        <InputLabel id='demo-multiple-name-labelp'>Region</InputLabel>
        <Select
          labelId='demo-multiple-name-labelregp'
          id='demo-multiple-nameregp'
          value={regdatap}
          label='helloo'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangesregp}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {rowz.map((el) => (
            <MenuItem
              key={el.region}
              value={el.region}
              style={getStyles(rowz, regdatap, theme)}>
              {el.region}
            </MenuItem>
          ))}
        </Select>
      </div>
      <TextField
        label='Address'
        margin='normal'
        inputRef={baddress}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={branchaddress}
        ref={formref}
      />{' '}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '20px',
          width: '300px',
          gap: '100px',
        }}></div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '70px',
        }}>
        {' '}
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
      <h4> </h4>
    </Card>
  );
}
const MapStateToprops = (store) => {
  return { ...store };
};

export default connect(MapStateToprops)(Regteam);
