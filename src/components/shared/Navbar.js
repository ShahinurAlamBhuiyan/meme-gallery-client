import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <div className="navbar">
            <h1>Meme Gallery</h1>
            <div className="navContainer">
               <Link  to="/"> <button>Home</button></Link>
               <Link to="/stats"> <button>stats</button></Link> 
            </div>
        </div>
    )
}
