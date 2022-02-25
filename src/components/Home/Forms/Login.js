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
import avatar from '../../../assets/demologo.png';

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

const styleinp = {
  fontSize: '300px',
};

const spinerStyle = {
  display: 'flex',
  flexDirection: 'rows',
  gap: '12px',
};

const logomain = {
  background: 'none',
  width: '200px',
  height: '100px',
  padding: '20px',
  backgroundColor: 'none',
  margin: 'auto',
  borderStyle: 'none !important',
  fontWeight: 'bold',
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
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handle();
    }
  };
  function handlecheck() {
    setChecked(!checked);
  }

  return (
    <div className='login-form'>
      <div style={logomain}>
        <img
          className='
      aimg'
          src={avatar}
          alt=''
        />
      </div>
      <Card variant='outlined' style={style}>
        <TextField
          InputLabelProps={{ style: { fontSize: 15 } }}
          label='Email '
          margin='normal'
          inputRef={username}
          variant='outlined'
          autoComplete='off'
          fullWidth
          ref={formref}
          onKeyDown={handleKeyDown}
        />{' '}
        <TextField
          label='Password '
          InputLabelProps={{ style: { fontSize: 15 } }}
          margin='normal'
          inputRef={password}
          type='password'
          variant='outlined'
          autoComplete='off'
          fullWidth
          ref={formref}
          onKeyDown={handleKeyDown}
        />{' '}
        <FormControlLabel
          style={{ marginRight: '70px', fontSize: '100' }}
          fullWidth
          control={<Checkbox checked={checked} onChange={handlecheck} />}
          label='Remember me'
        />
        <button className='btn-color' onClick={handle}>
          {loading ? (
            <div style={spinerStyle}>
              <Spinner loading={loading} /> Loading...{' '}
            </div>
          ) : (
            'Login'
          )}
        </button>
        <h4 style={{ color: 'blue' }}>
          <Link to='/reset-password' style={{ color: 'blue' }}>
            Forgot password ?
          </Link>{' '}
        </h4>{' '}
      </Card>{' '}
    </div>
  );
}

export default Login;
