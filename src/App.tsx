import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateApplication from './components/CreateApplication';
import ContactUs from './components/ContactUs';
import DepartmentLogin from './components/DepartmentLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/CreateApplication" element={<CreateApplication />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/DepartmentLogin" element={<DepartmentLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
