import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

import Camera from '../components/Camera';
import { registerUser } from '../store/actions/user.action';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(({ user }) => user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [faceDescriptor, setFaceDescriptor] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirm) {
      const requestData = {
        name,
        email,
        password,
        confirm,
        faceDescriptor
      };

      dispatch(registerUser(requestData))
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
            navigate('/login');
          }
        });
    } else {
      Swal.fire({
        toast: true,
        icon: "warning",
        position: 'top-right',
        text: "Passwords must be match.",
        timerProgressBar: true,
        timer: 3000,
        showConfirmButton: false
      });
    }
  }

  return (
    <main>
      <div className='auth-form'>
        <Camera setter={setFaceDescriptor} />

        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <TextField
            variant='outlined'
            type='text'
            label='Full Name'
            className='form-input'
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            required
          />

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

          <TextField
            variant='outlined'
            type='password'
            label='Confirm Password'
            className='form-input'
            value={confirm}
            onChange={({ target: { value } }) => setConfirm(value)}
            required
          />

          <Link to={'/login'}>Already have an account? Sign in</Link>

          <Button
            type='submit'
            variant='contained'
            className='form-submit'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={32} color='inherit' /> : 'Register'}
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Register;
