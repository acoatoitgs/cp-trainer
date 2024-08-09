import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Row, Col } from 'react-bootstrap';

import './UserProfileItem.css';

const UserProfileItem: React.FC = () => {
    const [name, setName] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [surname, setSurname] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [joindate, setJoindate] = useState<string | null>(null);
    const [userscore, setUserscore] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const username = Cookies.get('username');
            if (!username) {
                console.error("No username found in cookies");
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/training/getuserstats', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: username }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setName(data.first_name);
                setSurname(data.last_name);
                setImage(data.image_url);
                setUsername(data.username);
                setJoindate(data.join_day + '.' + data.join_month + '.' + data.join_year);
                setUserscore(data.user_score);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Container fluid className='profile-container'>
                <Row>
                    <Col md={7} className='profile-text'>
                        <ul>
                            <li className='personal-name'><strong>{name} {surname}</strong></li>
                            <li className='other-info'>{username}</li>
                            <li className='other-info'>Registered in {joindate}</li>
                            <li className='other-info'>Score: {userscore}</li>
                        </ul>
                    </Col>
                    <Col md={5} className='profile-image'>
                        <img src={image ? image : "https://placehold.co/300"} alt="Profile" />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UserProfileItem;
