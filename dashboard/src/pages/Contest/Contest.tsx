import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


import './Contest.css';
import NavBar from './components/NavBar';
const Dashboard: React.FC = () => {

    //Fetch all training data needed
    const navigate = useNavigate();
    useEffect(() => {
        const checkCookie = async () => {
            const c_username = Cookies.get('username');
            if (!c_username) {
                navigate('/login');
            }
        };

        checkCookie();
    }, [navigate]);

    return (
        <NavBar />
    )
};

export default Dashboard;
