import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/Navbar';
import {BrowserRouter} from 'react-router-dom'
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
// const App: React.FC = () => {

//   root.render(<App />);
//   return (
//     <React.StrictMode>
//         <BrowserRouter>
//             <div className='app'>
//               <App />
//             </div>
//         </BrowserRouter>
//     </React.StrictMode>
//   );
// }



