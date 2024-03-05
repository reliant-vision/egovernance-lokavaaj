import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CreateApplication from './components/CreateApplication';
import ContactUs from './components/ContactUs';
import DepartmentLogin from './components/DepartmentLogin';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
    <Header />
    <div className="content">
      <Sidebar />
    <main className="main-content">
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/CreateApplication" element={<CreateApplication />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/DepartmentLogin" element={<DepartmentLogin />} />
      </Routes>
    </Router>
    </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
