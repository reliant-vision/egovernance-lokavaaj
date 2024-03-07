// src/components/Header.tsx

import React from 'react';
import logoImage from '../images/goa-logo-blue.png';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logoImage} alt="Logo" />
      <h2>LOK AVAAJ - GOVERNMENT OF GOA</h2>
    </header>
  );
};

export default Header;
