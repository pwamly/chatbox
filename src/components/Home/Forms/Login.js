import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Check from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { login } from '../../../client/client';
import { useToasts } from 'react-toast-notifications';
import Spinner from '../../Spinner/Spiner';
import './form.css';
import avatar from '../../../assets/coca.png';

const style = {
  width: '400px',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: 'none',
  margin: 'auto',
  transition: '0.3s',
  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.1)',
  '&:hover': {
    boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.4)',
  },
};

const spinerStyle = {
  display: 'flex',
  flexDirection: 'rows',
  gap: '12px',
};

const logomain = {
  background: 'none',
  width: '100px',
  height: '100px',
  padding: '20px',
  backgroundColor: 'none',
  margin: 'auto',
};

function Login() {
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  //   const [formData, setForm] = useState({});
  const username = useRef('');
  const password = useRef('');
  const formref = useRef();

  async function handle() {
    try {
      setLoading(true);
      if (!username.current.value == '' && !password.current.value == '') {
        const response = await login({
          username: username.current.value,
          password: password.current.value,
        });
        if (response) {
          // formref.current.reset() to do clear form;
          setLoading(false);
          addToast('welcome!', {
            appearance: 'success',
            autoDismiss: true,
          });
          window.location.replace(`/dashboard`);
          return 'logged';
        }
        setLoading(false);
        addToast('Wrong Credentials try again!', { appearance: 'error' });
      } else {
        addToast('Fill all the fileds!', { appearance: 'error' });
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      addToast('Failed', { appearance: 'error' });
    }
  }

  function handlecheck() {
    setChecked(!checked);
  }

  return (
    <div className='login-form'>
      {/* <Card style={logomain}>
      <img className="aimg" src={avatar} alt="" />
     </Card> */}
      <Card variant='outlined' style={style}>
        <TextField
          label='Email '
          margin='normal'
          inputRef={username}
          variant='outlined'
          autoComplete='off'
          fullWidth
          ref={formref}
        />{' '}
        <TextField
          label='Password '
          margin='normal'
          inputRef={password}
          type='password'
          variant='outlined'
          autoComplete='off'
          fullWidth
          ref={formref}
        />{' '}
        <FormControlLabel
          style={{ marginRight: '70px' }}
          fullWidth
          control={<Checkbox checked={checked} onChange={handlecheck} />}
          label='Remember me'
        />
        <Button
          variant='contained'
          style={{ marginTop: '1rem' }}
          onClick={handle}
          style={{
            color: '#ffff',
            maxWidth: '100px',
            maxHeight: '30px',
            minWidth: '30px',
            minHeight: '30px',
            background: '#1F2937',
          }}>
          {loading ? (
            <div style={spinerStyle}>
              <Spinner loading={loading} /> Loading...{' '}
            </div>
          ) : (
            'Login'
          )}{' '}
        </Button>
        <h4>
          <Link to='/reset-password' style={{ textDecoration: 'none' }}>
            Forgot password ?
          </Link>{' '}
        </h4>{' '}
      </Card>{' '}
    </div>
  );
}

export default Login;
