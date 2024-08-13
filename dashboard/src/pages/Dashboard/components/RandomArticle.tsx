import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './RandomArticle.css';

const RandomArticle: React.FC = () => {
    const [title, setTitle] = useState<string | null>(null);
    const [subtitle, setSubtitle] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch('http://localhost:5000/api/randomcparticle', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                setTitle(data.title);
                setSubtitle(data.subtitle);
                setUrl(data.url);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Container fluid className='article-container'>
                <Row>
                    <Col className='article-text'>
                        <h2> {title}</h2>
                        <p> {subtitle}</p>

                        <a href={url ? url : "https://training.olinfo.it"} target='_blank'> Read more </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RandomArticle;
