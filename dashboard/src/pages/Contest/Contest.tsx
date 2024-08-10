import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import './Contest.css';
import './Contest.css';
import NavBar from './components/NavBar';
import RunningContest from './components/RunningContest';

const Dashboard: React.FC = () => {

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
        <>
            <NavBar />
            <div className='contest-content'>
                <RunningContest />
            </div>
        </>
    );
};

export default Dashboard;
