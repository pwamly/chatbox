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
  getItemByorder,
  loadPickup,
  unloadPickup,
  editUser,
} from '../../../../client/client';
import { Divider } from '@mui/material';
import '../order.css';
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
  reportdata,
  saveedit,
  saveeditbtn,
}) {
  const style = { display: 'flex', flexDirection: 'row', fontWeight: 'bold' };
  const [usrbranch, setCng] = useState('');
  const [usrrole, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const history = useHistory();
  const {
    orderid,
    itemname,
    itemtype,
    units,
    weight,
    unloadnote,
    unloadunits,
  } = reportdata;

  // ........................... for select ..................

  const theme = useTheme();
  const [customerData, setcustomerData] = useState('');
  const [cData, setCData] = useState('');
  const [distdata, setDistdata] = useState('');
  const [itemf, setItem] = useState('');
  const [driver, setDriver] = useState('');
  const [regdatap, setRegtdatap] = useState('');
  const [pickdate, setPickdate] = useState(new Date().toGMTString());
  const [deliverydat, setDeliverydate] = useState(new Date().toGMTString());
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const { results: itemdata } = useGetList(getItemByorder, {
    orderid: orderid,
  });

  // ........... to be passed to form values ..........
  const formref = useRef();
  const unloadunitsf = useRef();
  const unitsf = useRef();
  const weightf = useRef();
  const unloadnotef = useRef();
  const pickdat = useRef('');

  // ......................... to be passed to the form default...........

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
        let response = await unloadPickup({
          unloadnote: unloadnotef.current.value,
          unloadunits: unloadunitsf.current.value,
          itemid: itemf,
          orderid: orderid,
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

  const handleChangesitem = (event) => {
    const {
      target: { value },
    } = event;
    console.log('', value);

    setItem(value);
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
      <FormLabel>UNLOAD PICKUP</FormLabel>
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
        <InputLabel id='demo-multiple-name-label'>SELECT ITEM</InputLabel>
        <Select
          labelId='demo-multiple-name-labelreg'
          id='demo-multiple-namereg'
          value={itemf}
          label='helloo'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangesitem}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {itemdata.map((el) => (
            <MenuItem
              key={el.itemid}
              value={el.itemid}
              style={getStyles(itemdata, itemf, theme)}>
              {el.itemname}
            </MenuItem>
          ))}
        </Select>
      </div>
      <TextField
        label='QUANTITY'
        margin='normal'
        inputRef={unloadunitsf}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={unloadunits}
        ref={formref}
      />{' '}
      <TextField
        multiline
        rows={3}
        maxRows={4}
        fullWidth
        label='NOTE'
        margin='normal'
        inputRef={unloadnotef}
        variant='outlined'
        autoComplete='off'
        defaultValue={unloadnote}
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
