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
import { addUser, addorder, editUser } from '../../../client/client';
import { Divider } from '@mui/material';
import './order.css';
import { getUsers, getCustomers, getconsignors } from '../../../client/client';
import { useGet, useGetList } from '../../../hooks/index';

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

const regions = [
  {
    id: 1,
    name: 'kigoma',
  },
  {
    id: 2,
    name: 'Mwanza',
  },
  {
    id: 3,
    name: 'Arusha',
  },
];

const districts = [
  {
    id: 1,
    regionid: 1,
    regionname: 'kigoma',
    name: 'Uvinza',
  },
  { id: 1, regionid: 2, regionname: 'Mwanza', name: 'Igoma' },
  { id: 1, regionid: 3, name: 'Arumeru', regionname: 'Arusha' },
];

function getStyles(name, customer_Data, theme) {
  return {
    fontWeight:
      customer_Data.indexOf(name) === -1
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
  profile,
}) {
  const style = { display: 'flex', flexDirection: 'row', fontWeight: 'bold' };
  const [usrbranch, setCng] = useState('');
  const [usrrole, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  // ........................... for select ..................

  const theme = useTheme();
  const [customer_Data, setcustomerData] = useState('');
  const [cData, setCData] = useState('');
  const [customeriscons, setCustomeriscons] = useState('');
  const [distdata, setDistdata] = useState('');
  const [regdata, setRegtdata] = useState('');
  const [distdatap, setDistdatap] = useState('');
  const [regdatap, setRegtdatap] = useState('');
  const [pickdate, setPickdate] = useState(new Date().toGMTString());
  const [deliverydat, setDeliverydate] = useState(new Date().toGMTString());
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  const { results: rows, loading: loadin, refresh } = useGetList(getCustomers);
  const {
    results: rowscon,
    loading: loadinco,
    refresh: refreshn,
  } = useGetList(getconsignors, { customerid: customeriscons });

  // ........... to be passed to form values ..........

  const formref = useRef();
  const pickdat = useRef('');
  const deliverydate = useRef('');
  const packstreet = useRef('');
  const custnote = useRef('');
  const pkgnotes = useRef('');
  const distnstreet = useRef();
  const dtnnote = useRef();
  const congneename = useRef();
  const congneephone = useRef();
  // ......................... to be passed to the form default...........

  const {
    customernotes = '',
    pstreet = '',
    consignername = '',
    pnotes = '',
    dstreet = '',
    dnotes = '',
    consigneephone = '',
    consigneename = '',
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
      if (saveedit == 'save') {
        setLoading(true);
        // formref.current.reset();
        let response = await addorder({
          pickuptime: pickdate._i,
          expdlrtime: deliverydat._i,
          packagestreet: packstreet.current.value,
          custnote: custnote.current.value,
          packagenotes: pkgnotes.current.value,
          destinationstreet: distnstreet.current.value,
          customerid: customer_Data,
          consignerid: cData,
          Packagedistdata: distdata,
          packageRegionData: regdata,
          destinationData: distdatap,
          destinationRegionData: regdatap,
          destinationnotes: dtnnote.current.value,
          consigneename: congneename.current.value,
        });

        if (response) {
          console.log(response);
          setLoading(false);
          addToast(' Order Added successfully', {
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
          pickuptime: pickdat.current.value,
          expdlrtime: deliverydate.current.value,
          pstreet: packstreet.current.value,
          custnote: custnote.current.value,
          pnotes: pkgnotes.current.value,
          dstreet: distnstreet.current.value,
          customerData: customer_Data,
          cData: cData,
          distdata: distdata,
          regdata: regdata,
          distdatap: distdatap,
          regdatap: regdatap,
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

  //............

  const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setcustomerData(value);
    console.log('.>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', value.customeri);
    setCustomeriscons(value.customerid);
  };

  //......................... for consigers............

  const handleChangesc = (event) => {
    const {
      target: { value },
    } = event;
    setCData(value);
  };

  //......................... for regions............

  const handleChangesreg = (event) => {
    const {
      target: { value },
    } = event;
    setRegtdata(value);
  };

  //......................... for districts............

  const handleChangesdis = (event) => {
    const {
      target: { value },
    } = event;
    setDistdata(value);
  };
  //......................... for regions package............

  const handleChangesregp = (event) => {
    const {
      target: { value },
    } = event;
    setRegtdatap(value);
  };

  //......................... for districts package............

  const handleChangesdisp = (event) => {
    const {
      target: { value },
    } = event;
    setDistdatap(value);
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
      <FormLabel>ORDER FORM</FormLabel>
      <Divider
        fullWidth
        style={{
          background: 'gray',
          marginTop: '10px',
          marginBottom: '30px',
          height: '30px',
        }}
      />
      <span>
        <h5>Customer Details</h5>
      </span>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        {/* <span style={{ width: '12%' }}>Customer Name : </span> */}
        <InputLabel id='demo-multiple-name-label'>Customer Name</InputLabel>

        <Select
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
          value={customer_Data}
          label='helloo'
          style={{ width: '85%' }}
          onChange={handleChanges}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {rows.map((el) => (
            <MenuItem
              key={el.customerId}
              value={el.customerid}
              style={getStyles(rows, customer_Data, theme)}>
              {el.fname + '' + el.lname}
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
        {/* <span style={{ widith: '12%' }}>Consigner Name : </span> */}
        <InputLabel id='demo-multiple-name-label'>Consigner Name</InputLabel>
        <Select
          labelId='demo-multiple-name-label2'
          id='demo-multiple-name2'
          value={cData}
          label='helloo'
          style={{ width: '82%' }}
          onChange={handleChangesc}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {rowscon.map((el) => (
            <MenuItem
              key={el.consginerid}
              value={el.consginerid}
              style={getStyles(rowscon, cData, theme)}>
              {el.fullname}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5%' }}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                label='pickup-date'
                margin='normal'
                inputRef={pickdat}
                variant='outlined'
                autoComplete='off'
                fullWidth
                {...props}
              />
            )}
            label='Pick Up Date'
            value={pickdate}
            onChange={(newValue) => {
              setPickdate(newValue);
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            renderInput={(props) => (
              <TextField
                label='delivery-date'
                margin='normal'
                inputRef={deliverydate}
                variant='outlined'
                autoComplete='off'
                fullWidth
                {...props}
              />
            )}
            label='Expected Delivery Date'
            value={deliverydat}
            onChange={(newValue) => {
              setDeliverydate(newValue);
            }}
          />
        </LocalizationProvider>
      </div>
      <TextField
        multiline
        rows={2}
        maxRows={4}
        fullWidth
        label='Note'
        margin='normal'
        inputRef={custnote}
        variant='outlined'
        autoComplete='off'
        defaultValue={customernotes}
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
      <span>
        <h5>Package Location Details</h5>
      </span>
      <div
        style={{
          marginTop: '20px',
          width: '100%',
          gap: '5%',
        }}>
        {/* <span style={{ width: '12%' }}>FROM : </span> */}
        <InputLabel id='demo-multiple-name-label'>Region</InputLabel>
        <Select
          labelId='demo-multiple-name-labelreg'
          id='demo-multiple-namereg'
          value={regdata}
          label='helloo'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangesreg}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {regions.map((el) => (
            <MenuItem
              key={el.id}
              value={el.name}
              style={getStyles(regions, regdata, theme)}>
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
        <InputLabel id='demo-multiple-name-label'>District</InputLabel>
        <Select
          labelId='demo-multiple-name-label2'
          id='demo-multiple-name2'
          value={distdata}
          label='helloo'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangesdis}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {districts.map((el) => (
            <MenuItem
              key={el.consignerid}
              value={el.name}
              style={getStyles(districts, distdata, theme)}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <TextField
        label='Street'
        margin='normal'
        inputRef={packstreet}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={pstreet}
        ref={formref}
      />{' '}
      <TextField
        multiline
        rows={2}
        maxRows={4}
        fullWidth
        label='Note'
        margin='normal'
        inputRef={pkgnotes}
        variant='outlined'
        autoComplete='off'
        defaultValue={pnotes}
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
      />{' '}
      <span>
        <h5>Destination Details</h5>
      </span>
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
          {regions.map((el) => (
            <MenuItem
              key={el.id}
              value={el.name}
              style={getStyles(regions, regdatap, theme)}>
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
        <InputLabel id='demo-multiple-name-labelp'>District</InputLabel>
        <Select
          labelId='demo-multiple-name-label2p'
          id='demo-multiple-name2p'
          value={distdatap}
          label='helloo'
          style={{ width: '100%' }}
          fullWidth
          onChange={handleChangesdisp}
          input={<OutlinedInput label='Name'></OutlinedInput>}
          MenuProps={MenuProps}>
          {districts.map((el) => (
            <MenuItem
              key={el.consignerid}
              value={el.name}
              style={getStyles(districts, distdatap, theme)}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <TextField
        label='Street'
        margin='normal'
        inputRef={distnstreet}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={dstreet}
        ref={formref}
      />{' '}
      <TextField
        label='Consignee Name'
        margin='normal'
        inputRef={congneename}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={consigneename}
        ref={formref}
      />{' '}
      <TextField
        label='Consignee Phone'
        margin='normal'
        inputRef={congneephone}
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={consigneephone}
        ref={formref}
      />{' '}
      <TextField
        multiline
        rows={2}
        maxRows={4}
        fullWidth
        label='Note'
        margin='normal'
        inputRef={dtnnote}
        variant='outlined'
        autoComplete='off'
        defaultValue={dnotes}
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
      />{' '}
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

