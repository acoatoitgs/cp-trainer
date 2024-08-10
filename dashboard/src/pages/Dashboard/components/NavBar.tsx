import React from 'react';
import ImageDisplay from '../../ImageDisplay';
import NavButton from './NavButton';
import { FaHome, FaCogs, FaUser, FaEnvelope } from 'react-icons/fa'; // Importa le icone
import './NavBar.css';

const NavBar: React.FC = () => {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <ImageDisplay imageUrl='logo.png' />
            </div>
            <hr></hr>
            <div className="nav-buttons">
                <NavButton icon={<FaHome />} text="Home" href="/app" />
                <NavButton icon={<FaCogs />} text="Simulate a contest" href="/startcontest" />
            </div>
        </div>
    );
};

export default NavBar;
