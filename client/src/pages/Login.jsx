import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

import Camera from '../components/Camera';
import { loginUser, loginWithFace } from '../store/actions/user.action';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(({ user }) => user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const faceLogin = (descriptor) => {
    dispatch(loginWithFace(descriptor))
      .then(response => {
        Swal.fire({
          toast: true,
          icon: response?.success ? "success" : "error",
          position: 'top-right',
          text: response?.message,
          timerProgressBar: true,
          timer: 3000,
          showConfirmButton: false
        });

        if (response?.success) {
          navigate('/');
        }
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      email,
      password
    };

    dispatch(loginUser(requestData))
      .then(response => {
        Swal.fire({
          toast: true,
          icon: response?.success ? "success" : "error",
          position: 'top-right',
          text: response?.message,
          timerProgressBar: true,
          timer: 3000,
          showConfirmButton: false
        });

        if (response?.success) {
          navigate('/');
        }
      });
  }

  return (
    <main>
      <div className='auth-form'>
        <Camera setter={faceLogin} />

        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <TextField
            variant='outlined'
            type='email'
            label='Email'
            className='form-input'
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            required
          />

          <TextField
            variant='outlined'
            type='password'
            label='Password'
            className='form-input'
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            required
          />

          <Link to={'/register'}>Don't have an account? Sign up</Link>

          <Button
            type='submit'
            variant='contained'
            className='form-submit'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={32} color='inherit' /> : 'Login'}
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Login;
