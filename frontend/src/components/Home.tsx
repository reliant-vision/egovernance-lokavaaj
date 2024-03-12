import React from 'react'
import Header from './Header';
import Footer from './Footer';
import '../styles/home.css'; 


const homeimg = require("../assets/home-img1.jpg");
const HomePage=()=>{
    return (
        <div>
        <Header />
        <div className='home-container'>
            <img src={homeimg} alt="homeimg" className="home-img" />
        </div>
        <Footer />
        </div>
    )
}


export default HomePage;