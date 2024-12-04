// import * as React from 'react'
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faBell, faSun, faMoon, faBars, faGear } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import UserContext from '../../../GlobalContext/context';
const HorizontalNavBar =()=> {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const context = useContext(UserContext);
  const { setHide, useHide, toggleFullscreen }: any = context;

  const useimg = require("../assets/useimg.png");

  const handleThemeToggle = () => {
    setIsDarkMode((prevState) => !prevState);
    document.querySelector("body")?.classList.toggle("dark");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar">
    <div className="logo_item">
      <div className={`bottom_content ${useHide ? 'sidebar-closedBar' : 'sidebar-openBa'}`}>
        <div className="bottom expand_sidebar" onClick={() => setHide(!useHide)}>
          <FontAwesomeIcon className={`bx bx`} icon={faBars} size='xs' />
        </div>
      </div>
    </div>

    <div className="navbar_content">
      <div className="search_bar">
        <input type="text" placeholder="Search.." className='searchcss' />
      </div>
      <FontAwesomeIcon className='bx bx-bell' icon={faExpand} onClick={toggleFullscreen} size='lg' />
      <FontAwesomeIcon className='bx bx-bell' icon={faBell} style={{ fontSize: '22px !important' }} />
      <FontAwesomeIcon className={isDarkMode ? 'bx bx-moon' : 'bx bx-sun'} onClick={handleThemeToggle} icon={isDarkMode ? faMoon : faSun} size='lg' />
      <div className="dropdown">
        <img src={useimg} alt="Profile" className="profile dropbtn" onClick={toggleDropdown} />
        <div id="myDropdown" className={`dropdown-content ${isOpen ? 'show' : ''}`}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
      <FontAwesomeIcon className='bx bx-user' icon={faGear} size='lg' />
    </div>
  </nav>
  );
};

export default HorizontalNavBar;

