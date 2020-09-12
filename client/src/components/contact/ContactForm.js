import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const ContactForm = () => {
  const { addContacts, current, clearAll, updateContacts } = useContext(
    GlobalContext
  );
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
  }, [current]);

  const { name, email, phone, type } = contact;
  function handleChange(event) {
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (current === null) addContacts(contact);
    else updateContacts(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {current !== null ? (
          <h2 className='text-primary'>Update Contact</h2>
        ) : (
          <h2 className='text-primary'>Add Contact</h2>
        )}
        <input
          type='text'
          placeholder='name'
          name='name'
          value={name}
          onChange={handleChange}
          required
        ></input>
        <input
          type='text'
          placeholder='email'
          name='email'
          value={email}
          onChange={handleChange}
          required
        ></input>
        <input
          type='text'
          placeholder='phone'
          name='phone'
          value={phone}
          onChange={handleChange}
        ></input>
        <h5>Contact Type</h5>
        <input
          type='radio'
          name='type'
          value='personal'
          checked={type === 'personal'}
          onChange={handleChange}
        />{' '}
        Personal{' '}
        <input
          type='radio'
          name='type'
          value='professional'
          checked={type === 'professional'}
          onChange={handleChange}
        />{' '}
        Professional
        <div>
          {current !== null ? (
            <input
              type='submit'
              value='UPDATE CONTACT'
              className='btn btn-primary btn-block'
            />
          ) : (
            <input
              type='submit'
              value='ADD CONTACT'
              className='btn btn-primary btn-block'
            />
          )}
        </div>
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>
              CLEAR
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
export default ContactForm;
