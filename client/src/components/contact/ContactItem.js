import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const ContactItem = ({ contact }) => {
  const { deleteContacts, clearCurrent, getCurrent } = useContext(
    GlobalContext
  );
  const { _id, name, email, phone, type } = contact;

  function handleDelete() {
    deleteContacts(_id);
    clearCurrent();
  }
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge' +
            (type === 'professional' ? ' badge-success' : ' badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'> {email}</i>
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'> {phone}</i>
          </li>
        )}
      </ul>
      <p>
        <button
          onClick={() => {
            getCurrent(contact);
          }}
          className='btn btn-dark btn-sm'
        >
          Edit
        </button>
        <button onClick={handleDelete} className='btn btn-danger btn-sm'>
          Delete
        </button>
      </p>
    </div>
  );
};
export default ContactItem;
