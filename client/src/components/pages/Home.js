import React, { useContext, useEffect } from 'react';
import Contact from '../contact/Contact';
import ContactForm from '../contact/ContactForm';
import FilterContact from '../contact/FilterContact';
import { GlobalContext } from '../../context/GlobalState';

const Home = () => {
  const { loadUser } = useContext(GlobalContext);
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <FilterContact />
        <Contact />
      </div>
    </div>
  );
};
export default Home;
