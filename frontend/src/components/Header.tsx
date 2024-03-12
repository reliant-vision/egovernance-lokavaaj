// Header.tsx

import React from 'react';
import '../styles/header.css'; // Import CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faBars } from '@fortawesome/free-solid-svg-icons';



const logo =  require("../assets/logo.png");
const Header: React.FC = () => {
  return (
    <div>
    <div className="color-overlay"></div>
    <div className="header-container">
      <img src={logo} alt="Logo" className="header-logo" />
      <h2 className="header-title">
        <p>LOK AVAAJ</p>
        <p>GOVT. OF GOA</p>
      </h2>
      <nav className="header-nav">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li className="login-btn"><a href="#"><FontAwesomeIcon icon={faSignInAlt} /> Login</a></li>
          <li className='bars'><a href='#'><FontAwesomeIcon icon={faBars} /></a></li>
        </ul>
      </nav>
    </div>
    </div>
  );
};

export default Header;
