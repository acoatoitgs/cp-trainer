import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import NavBar from './components/NavBar';
import UserProfile from './components/UserProfile';
import DashboardGrid from './components/DashboardGrid'
import LoadingStats from './components/LoadingStats';

import './Dashboard.css';
import { fetchDataFromTraining } from '../../interface/FetchDataFromTraining';

const Dashboard: React.FC = () => {

    const [isLoading, setIsLoading] = useState(true);

    //Fetch all training data needed
    const navigate = useNavigate();
    useEffect(() => {
        const checkCookie = async () => {
            const c_username = Cookies.get('username');
            if (!c_username) {
                navigate('/login');
            }
        };

        const fetchData = async () => {
            try {
                const c_username = Cookies.get('username');
                if (!c_username) return;

                const success = (await fetchDataFromTraining(c_username)).success;
                await new Promise(resolve => setTimeout(resolve, 1000));

            } catch (error) {
                console.error('Errore nel caricamento dei dati:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkCookie();
        fetchData();
    }, [navigate]);

    if (isLoading) {

        return (
            <div className="dashboard">
                <NavBar />
                <div className='dashboard-content'>
                    <LoadingStats />
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="dashboard">
                <NavBar />
                <UserProfile />

                <div className='dashboard-content'>
                    <DashboardGrid />
                </div>
            </div>
        );
    }
};

export default Dashboard;
