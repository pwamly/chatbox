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
  getBranches,
  getOrders,
  createBundle,
  updateBundle,
  registerRegion,
  updateRegion,
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

// ................. end for select

function AddRegion({
  dispatch,
  branchdata,
  reportdata,
  saveedit,
  saveeditbtn,
}) {
  const style = { display: 'flex', flexDirection: 'row', fontWeight: 'bold' };

  // ........................... for select ..................

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
  const regionf = useRef('');

  // ......................... to be passed to the form default...........

  const history = useHistory();

  const { region, regionId } = reportdata;

  const spinerStyle = {
    display: 'flex',
    flexDirection: 'rows',
    gap: '12px',
  };

  async function handlesave() {
    try {
      if (saveedit == 'save') {
        setLoading(true);
        let response = await registerRegion({
          region: regionf.current.value,
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
        let response = await updateRegion({
          region: regionf.current.value,
          regionid: regionId,
        });

        if (response) {
          console.log(response);
          setLoading(false);
          addToast(' User Updated successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
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

  //
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
      <FormLabel> ADD REGIONS</FormLabel>
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
        label='REGION NAME'
        margin='normal'
        inputRef={regionf}
        // disabled={1} for disabling fields
        variant='outlined'
        autoComplete='off'
        fullWidth
        defaultValue={region}
        ref={formref}
      />{' '}
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

export default connect(MapStateToprops)(AddRegion);
