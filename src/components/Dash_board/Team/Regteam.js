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
import { addUser, editUser } from '../../../client/client';

const spinerStyle = {
  display: 'flex',
  flexDirection: 'rows',
  gap: '12px',
};

function Regteam({ adduser, teamdata, dispatch, saveedit, saveeditbtn }) {
  const style = { display: 'flex', flexDirection: 'row', fontWeight: 'bold' };
  const [usrbranch, setCng] = useState('');
  const [usrrole, setRole] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const formref = useRef();
  const fsname = useRef('');
  const lsname = useRef('');
  const usrphone = useRef('');
  const usremail = useRef('');
  const signature = useRef('');
  const usrpass = useRef('');

  const {
    fname = '',
    lname = '',
    phone = '',
    email = '',
    role = '',
    branch = '',
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
  const handleChange2 = (event) => {
    setRole(event.target.value);
  };

  async function handlesave() {
    try {
      if (saveedit == 'add') {
        setLoading(true);
        // formref.current.reset();
        let response = await addUser({
          firstname: fsname.current.value,
          lastname: lsname.current.value,
          email: usremail.current.value,
          username: usremail.current.value,
          branch: branch,
          role: role,
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
        minWidth: '300px',
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '20px',
          width: '300px',
          gap: '100px',
        }}>
        <InputLabel id='label2' style={{ fontSize: '15px' }}>
          {' '}
          Branch
        </InputLabel>
        <Select
          labelId='label'
          id='select'
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={usrbranch}
          placeholder='Branch'
          onChange={handleChange}
          defaultValue={branch}
          ref={formref}>
          {[
            { branch: 'dar es salaam', id: 1 },
            { branch: 'Mbeya', id: 2 },
          ].map((e) => (
            <MenuItem value={e.branch} id={e.id}>
              {e.branch}{' '}
            </MenuItem>
          ))}
        </Select>{' '}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '20px',
          width: '300px',
          gap: '120px',
        }}>
        <InputLabel id='label2' style={{ fontSize: '15px' }}>
          {' '}
          Role
        </InputLabel>
        <Select
          labelId='labe2'
          id='select2'
          open={open2}
          onClose={handleClose2}
          onOpen={handleOpen2}
          value={usrrole}
          onChange={handleChange2}
          defaultValue={role}
          ref={formref}>
          {[
            { role: 'driver', id: 5 },
            { role: 'accountant', id: 3 },
          ].map((e) => (
            <MenuItem value={e.role} id={e.id}>
              {' '}
              {e.role}{' '}
            </MenuItem>
          ))}
        </Select>{' '}
      </div>
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
