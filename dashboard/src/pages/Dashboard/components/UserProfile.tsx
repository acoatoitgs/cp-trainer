import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { getUserProfilePic } from '../../../interface/GetUserProfilePic';

import './UserProfile.css';

const UserProfile: React.FC = () => {

    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState<string | null>(Cookies.get('username') || '');
    const [profilePicUrl, setProfilePicUrl] = useState<string>('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchProfilePic = async () => {
            if (username) {
                try {
                    const imgUrl = await getUserProfilePic(username);
                    setProfilePicUrl(imgUrl);
                } catch (error) {
                    console.error('Errore nel recupero dell\'immagine del profilo:', error);
                }
            }
        };

        fetchProfilePic();
    }, [username]);

    //Handles click on profile image
    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    //Logout logic
    const handleClear = () => {
        Cookies.remove('username');
        setUsername('');
        navigate('/login');
    };

    return (
        <div className="user-profile">
            <img
                src={profilePicUrl || 'https://via.placeholder.com/150'}
                alt="User Profile"
                className="user-image"
                onClick={handleClick}
            />
            {isVisible && (
                <div className="dropdown-content">
                    <div className="user-info">
                        <h3>{username}</h3>
                        <button onClick={handleClear}>Logout</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
