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
import { addUser, additem, editUser } from '../../../../client/client';
import { Divider } from '@mui/material';
import '../order.css';
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

const items = [
  {
    id: 1,
    name: 'PC',
  },
  {
    id: 2,
    name: 'SEED',
  },
  {
    id: 3,
    name: 'FOOD',
  },
];

const drivers = [
  {
    id: 1,
    userid: '',
    name: 'Ally mauya',
  },
  {
    id: 1,
    userid: '',
    name: 'Johny peter',
  },
];

const vehicles = [
  {
    id: 1,
    userid: '',
    name: 'ISSUZU',
  },
  {
    id: 1,
    userid: '',
    name: 'TOYOTA',
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
  reportdata,
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

  // ........... to be passed to form values ..........
  const formref = useRef();
  const itemnamef = useRef();
  const unitsf = useRef();
  const weightf = useRef();
  const notef = useRef();
  // ......................... to be passed to the form default...........

  const history = useHistory();
  const { orderid, itemname, itemtype, units, weight, note } = reportdata;

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
    console.log('', data, selector);
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
      if (saveedit == 'save') {
        setLoading(true);
        // formref.current.reset();
        let response = await additem({
          orderid,
          itemname: itemnamef.current.value,
          units: unitsf.current.value,
          weight: weightf.current.value,
          note: notef.current.value,
          itemtype: itemtypef,
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
    console.log('vccccccccccccccccccvvvvvvvvvvvvb', value);

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
      <FormLabel>ITEM FORM</FormLabel>
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
        label='ITEM NAME'
        margin='normal'
        inputRef={itemnamef}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={itemname}
        ref={formref}
      />{' '}
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        {/* <span style={{ width: '12%' }}>FROM : </span> */}
        <InputLabel id='demo-multiple-name-label'>ITEM TYPE</InputLabel>
        <Select
          labelId='demo-multiple-name-labelreg'
          id='demo-multiple-namereg'
          value={itemtypef}
          label='helloo'
          style={{ width: '100%' }}
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
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={weight}
        ref={formref}
      />{' '}
      <TextField
        multiline
        rows={3}
        maxRows={4}
        fullWidth
        label='DESCRIPTION'
        margin='normal'
        inputRef={notef}
        variant='outlined'
        autoComplete='off'
        defaultValue={note}
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
