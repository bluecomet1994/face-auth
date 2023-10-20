import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';

import { loginWithToken } from '../store/actions/user.action';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogging, user } = useSelector(({ user }) => user);

  const logoutUser = () => {
    localStorage.removeItem('access-token');
    navigate('/login');
  }

  useEffect(() => {
    const token = localStorage.getItem('access-token');

    if (token) {
      dispatch(loginWithToken())
        .catch(() => {
          Swal.fire({
            toast: true,
            icon: "error",
            position: 'top-right',
            text: "Token has been expired.",
            timerProgressBar: true,
            timer: 3000,
            showConfirmButton: false
          });

          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return (
    <main>
      {
        isLogging ? (
          <CircularProgress />
        ) : (
          <div className='home-card'>
            <h1>WELCOME!</h1>

            <div className='user-info-container'>
              <img alt='avatar' src='/assets/man.jpg' />

              {
                user && (
                  <div>
                    <h2>{user.name}</h2>
                    <h3>{user.email}</h3>

                    <Button variant='contained' onClick={logoutUser}>Logout</Button>
                  </div>
                )
              }
            </div>
          </div>
        )
      }
    </main>
  );
}

export default Home;
