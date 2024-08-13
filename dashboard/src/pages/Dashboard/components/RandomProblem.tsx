import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './RandomProblem.css';

const RandomProblem: React.FC = () => {
    const [maxPoints, setMaxPoints] = useState<number | null>(null);
    const [userPoints, setUserPoints] = useState<number | null>(null);
    const [userScore, setUserScore] = useState<number | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [task, setTask] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch('http://localhost:5000/api/training/getrandomproblem', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ full: 0, partial: 0, fail: 1 }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);

                setMaxPoints(data.max_points);
                setUserPoints(data.user_points);
                setUserScore(data.user_score);
                setTitle(data.title);
                setTask(data.task);
                setUrl(data.url);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, []);

    return (
        <div>
            <Container fluid className='problem-container'>
                <Row>
                    <Col className='problem-text'>
                        <h2> {title + '(' + task + ')'}</h2>
                        <h3> Max score: {maxPoints}</h3>
                        <a href={url ? url : "https://training.olinfo.it"}> {url} </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default RandomProblem;
