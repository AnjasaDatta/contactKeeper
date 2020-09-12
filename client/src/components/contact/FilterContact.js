import React, { useRef, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const FilterContact = () => {
  const { filterContacts, clearFilterContacts, filtered } = useContext(
    GlobalContext
  );
  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });
  function handleChange(e) {
    if (text.current.value !== '') filterContacts(e.target.value);
    else clearFilterContacts();
  }
  return (
    <div>
      <input
        type='text'
        placeholder='Filtered Contacts...'
        ref={text}
        onChange={handleChange}
      />
    </div>
  );
};
export default FilterContact;
