import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from './components/Navbar';
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import SignUpPage from './components/SignUp';
import LoginPage from './components/Login';

const App: React.FC = () => {
  
  return (
    <div className='app'>
      <NavBar/>
    </div>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
