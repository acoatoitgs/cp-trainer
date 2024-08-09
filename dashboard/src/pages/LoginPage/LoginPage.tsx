import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { validateUsername } from '../../interface/UserValidation';
import { Container } from 'react-bootstrap';
import { GrAction } from "react-icons/gr";

import './LoginPage.css';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkCookie = async () => {
            const c_username = Cookies.get('username') || '';
            if (c_username) {
                const isValid = await validateUsername(c_username);
                if (isValid) {
                    navigate('/app');
                } else {
                    Cookies.remove('username');
                }
            }
        };

        checkCookie();
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validateUsername(username);

        if (isValid) {
            Cookies.set('username', username);
            navigate('/app');
        } else {
            setError('Invalid username');
        }
    };

    return (
        <div className='page-container'>
            <div className='login-half'>
                <Container fluid className='login-container'>
                    <div className='login-box'>
                        <h1>Sign in</h1>

                        <form onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Sign in</button>
                            {error && <p>{error}</p>}

                            <div className='login-warning'>
                                <GrAction />
                                <span>
                                    &nbsp;Sign in using your <a href='https://training.olinfo.it'> training.olinfo.it</a> username!
                                </span>
                            </div>
                        </form>

                    </div>

                </Container>

            </div>
            <div className='right-half'>

            </div>
        </div >
    );
};

export default LoginPage;
