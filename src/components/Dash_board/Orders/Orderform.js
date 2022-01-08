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
import { addUser, addBranch, editUser } from '../../../client/client';

// ...................... for select ..............................

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabels from '@mui/material/InputLabel';
import MenuItems from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Selects from '@mui/material/Select';

// .................... for select end.........................

//  import Textdate from '@mui/material/TextField';
 import AdapterDateFns from '@mui/lab/AdapterDateFns';
 import LocalizationProvider from '@mui/lab/LocalizationProvider';
 import DateTimePicker from '@mui/lab/DateTimePicker';

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

const customers = [
  {
    customerId: 'bdar-1',
    customername: 'NMB KAWE',
    customeraddress: 'P.O.BOX 56,KINONDONI,KAWE NALEWA STREET,MOBILE:2222229',
  },
  {
    customerId: 'bdar-2',
    customername: 'CRD MBEZI',
    customeraddress: 'P.O.BOX 16,UBUNGO,MAGUFULI BUS STOP STREET,MOBILE:123444',
  },
];

const consgigners = [
  {
    consignerid: 'nmb-dar-kinondoni-kawe-1',
    ccompanyId: 'bdar-1',
    cfname: 'Johny',
    clname: 'kibweta',
    cmobile: '+255673999',
    cemail: 'kibwe@gmail.com',
    crole: 'IT',
    caddress: 'P.O.BOX 56,KINONDONI,KAWE NALEWA STREET,MOBILE:2222229',
  },
  {
    consignerid: 'nmb-dar-kinondoni-kawe-2',
    ccompanyId: 'bdar-1',
    cfname: 'kulwa',
    clname: 'magembe',
    cmobile: '+2556739444',
    cemail: 'magembe@gmail.com',
    crole: 'accountant',
    caddress: 'P.O.BOX 46,TEMEKE,KIWALENI STREET,MOBILE:23444',
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

  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  // ........... to be passed to form values ..........

  const formref = useRef();
  const bname = useRef('');
  const bregion = useRef('');
  const bdistrict = useRef('');
  const baddress = useRef('');
  const bid = useRef('');

  // ......................... to be passed to the form default...........
  const {
    branchname = '',
    customerid = '',
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

  async function handlesave() {
    try {
      if (saveedit == 'add') {
        setLoading(true);
        // formref.current.reset();
        let response = await addBranch({
          branchId: bid.current.value,
          branchaddress: baddress.current.value,
          branchname: bname.current.value,
          district: bdistrict.current.value,
          region: bregion.current.value,
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
          branchId: bid.current.value,
          branchaddress: baddress.current.value,
          branchname: bname.current.value,
          district: bdistrict.current.value,
          region: bregion.current.value,
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

  // ........................... for select ..................

  const theme = useTheme();
  const [customerData, setcustomerData] = useState([]);
  const [cData, setCData] = useState([]);

  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setcustomerData(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleChangesc = (event) => {
    const {
      target: { value },
    } = event;
    setCData(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
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
        minWidth: '300px',
        zIndex: '1',
        height: 'auto',
        borderRadius: '16px',
        maxWidth: '80%',
        padding: '20px',
        borderRadius: '16px',
        transition: '0.3s',
        // boxShadow: '0 8px 40px -12px rgba(0,0,0,0.4)',
        // '&:hover': {
        //   boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.4)',
        // },
      }}>
      <FormLabel>ORDER FORM</FormLabel>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        <span style={{ width: '12%' }}>Customer Name : </span>
        <Select
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
          value={customerData}
          label='helloo'
          style={{ width: '85%' }}
          onChange={handleChanges}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {customers.map((el) => (
            <MenuItem
              key={el.customerId}
              value={el.customerId}
              style={getStyles(customers, customerData, theme)}>
              {el.customername}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        <span style={{ widith: '12%' }}>Consigner Name : </span>
        <Select
          labelId='demo-multiple-name-label2'
          id='demo-multiple-name2'
          value={cData}
          label='helloo'
          style={{ width: '82%' }}
          onChange={handleChangesc}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {consgigners.map((el) => (
            <MenuItem
              key={el.consignerid}
              value={el.consignerid}
              style={getStyles(consgigners, cData, theme)}>
              {el.cfname + ' ' + el.clname}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div
        id='tofrom'
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '20px',
            width: '100%',
            gap: '10%',
          }}>
          <span style={{ width: '12%' }}>FROM : </span>
          <Select
            labelId='demo-multiple-name-label2'
            id='demo-multiple-name2'
            value={cData}
            label='helloo'
            style={{ width: '75%' }}
            onChange={handleChangesc}
            input={<OutlinedInput label='Name'></OutlinedInput>}
            MenuProps={MenuProps}>
            {consgigners.map((el) => (
              <MenuItem
                key={el.consignerid}
                value={el.consignerid}
                style={getStyles(consgigners, cData, theme)}>
                {el.cfname + ' ' + el.clname}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: '20px',
            width: '100%',
            gap: '5',
          }}>
          <span style={{ width: '12%' }}>TO : </span>
          <Select
            labelId='demo-multiple-name-label2'
            id='demo-multiple-name2'
            value={cData}
            label='helloo'
            style={{ width: '75%' }}
            onChange={handleChangesc}
            input={<OutlinedInput label='Name'></OutlinedInput>}
            MenuProps={MenuProps}>
            {consgigners.map((el) => (
              <MenuItem
                key={el.consignerid}
                value={el.consignerid}
                style={getStyles(consgigners, cData, theme)}>
                {el.cfname + ' ' + el.clname}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <TextField
        label='FROM'
        margin='normal'
        inputRef={bid}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={branchId}
        ref={formref}
      />{' '}
      <TextField
        label='To '
        margin='normal'
        inputRef={bname}
        variant='outlined'
        autoComplete='off'
        fullWidth
        ref={formref}
        defaultValue={branchname}
      />{' '}
      <TextField
        label='Region '
        margin='normal'
        inputRef={bregion}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={region}
        ref={formref}
      />{' '}
      <TextField
        label='District'
        margin='normal'
        inputRef={bdistrict}
        variant='outlined'
        autoComplete='off'
        fullWidth
        ref={formref}
        defaultValue={district}
      />{' '}
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
