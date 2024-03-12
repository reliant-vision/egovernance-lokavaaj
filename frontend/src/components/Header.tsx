// Header.tsx

import React from 'react';
import '../styles/header.css'; // Import CSS file

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
        </ul>
      </nav>
    </div>
    </div>
  );
};

export default Header;
