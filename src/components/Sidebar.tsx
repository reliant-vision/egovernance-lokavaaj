// src/components/Sidebar.tsx

import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      {/* Your sidebar content goes here */}
      <nav>
        <ul>
          <li>Create Application</li>
          <li>Know Your Application Status</li>
          {/* Add more menu items as needed */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
