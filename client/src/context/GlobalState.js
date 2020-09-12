import React, { useReducer, useEffect } from 'react';
import { createContext } from 'react';
import AppReducer from './AppReducer';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import SetAuthToken from '../utils/SetAuthToken';

//initialState
const initialState = {
  contacts: localStorage.getItem('contacts')
    ? JSON.parse(localStorage.getItem('contacts'))
    : [],
  current: null,
  filtered: null,
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  error: null,
  alerts: [],
};

//createContext
export const GlobalContext = createContext(initialState);

//provider
export const GlobalProvider = props => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state]);

  //actions
  const addContacts = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({
        type: 'ADD_CONTACT',
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'ADD_CONTACT_FAIL',
        payload: err.response.data.msg,
      });
    }
  };
  // Get Contacts
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');

      dispatch({
        type: 'GET_CONTACTS',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'CONTACT_ERROR',
        payload: err.response.msg,
      });
    }
  };
  const deleteContacts = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);
      dispatch({
        type: 'DELETE_CONTACT',
        payload: id,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'DELETE_ERROR',
        payload: err.response.data.msg,
      });
    }
  };
  const getCurrent = async contact => {
    dispatch({ type: 'GET_CURRENT', payload: contact });
  };
  const clearCurrent = () => {
    dispatch({
      type: 'CLEAR_CURRENT',
    });
  };
  const clearAll = () => {
    dispatch({
      type: 'CLEAR_ALL',
    });
  };
  const updateContacts = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({
        type: 'UPDATE_CONTACT',
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'UPDATE_ERROR',
        payload: err.response.data.msg,
      });
    }
  };
  const filterContacts = text => {
    dispatch({
      type: 'FILTER_CONTACTS',
      payload: text,
    });
  };
  const clearFilterContacts = () => {
    dispatch({
      type: 'CLEAR_FILTER',
    });
  };
  //set alert
  const setAlert = (msg, type) => {
    const id = uuidv4();
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type, id },
    });
    setTimeout(
      () =>
        dispatch({
          type: 'REMOVE_ALERT',
          payload: id,
        }),
      5000
    );
  };
  //load user
  const loadUser = async () => {
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: 'USER_LOADED',
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: 'LOAD_FAIL',
        payload: err.response.data.msg,
      });
    }
  };
  //register user
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: 'REGISTER_SUCESS',
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg,
      });
    }
  };
  //login user
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: 'LOGIN_SUCESS',
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg,
      });
    }
  };
  //logout user
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };
  //clear error
  const clearError = () => {
    dispatch({
      type: 'CLEAR_ERROR',
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        getContacts,
        addContacts,
        deleteContacts,
        getCurrent,
        clearCurrent,
        clearAll,
        updateContacts,
        filterContacts,
        clearFilterContacts,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        setAlert,
        alerts: state.alerts,
        register,
        login,
        loadUser,
        clearError,
        logout,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
