import React from 'react';
import { FaHome, FaCogs, FaUser, FaEnvelope } from 'react-icons/fa'; // Importa le icone che desideri
import './NavButton.css'; // Aggiungi uno stile se necessario

interface NavButtonProps {
    icon: React.ReactNode;
    text: string;
    href: string;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, text, href }) => {
    return (
        <a href={href} className="nav-button">
            {icon}
            <span>{text}</span>
        </a>
    );
};

export default NavButton;
