import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const Login = props => {
  const { setAlert, login, error, isAuthenticated, clearError } = useContext(
    GlobalContext
  );
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearError();
    }
  }, [error, isAuthenticated, props.history]);
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '')
      setAlert('Please enter all fields', 'danger');
    else login({ email, password });
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};
export default Login;
