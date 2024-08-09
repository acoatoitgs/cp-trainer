import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieManager: React.FC = () => {
    const [username, setUsername] = useState<string | null>(Cookies.get('username') || '');

    useEffect(() => {
        Cookies.set('username', username || '');
    }, [username]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleClear = () => {
        Cookies.remove('username');
        setUsername('');
        //logout user
    };

    return (
        <div>
            <h1>Cookie Manager</h1>
            <input
                type="text"
                value={username || ''}
                onChange={handleChange}
                placeholder="Enter username"
            />
            <button onClick={handleClear}>Logout</button>
            <div>
                <h2>Stored Username:</h2>
                <p>{username || 'No username stored in cookie'}</p>
            </div>
        </div>
    );
};

export default CookieManager;
