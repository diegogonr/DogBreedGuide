import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import './navbar.styles.css';

const Navbar = ({ onSearch }) => {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(name);
  };

  const handleChange = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
    if (event.target.value === '') {
      onSearch(null); 
    }
  };

  return (
    <div className='container-navbar'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Busque la raza' value={name} onChange={handleChange} />
       
        <button type='button' className='icon-button' onClick={handleSubmit}>
          <SearchIcon className='icon' />
        </button>
      </form>
    </div>
  );
};

export default Navbar;
