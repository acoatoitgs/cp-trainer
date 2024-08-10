import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ImCross } from "react-icons/im";
import { FaPlay } from 'react-icons/fa';
import { FaStop } from 'react-icons/fa';

import './RunningContest.css';
import { Col, Container, Row } from 'react-bootstrap';
import { time } from 'console';

interface Problem {
    id: number;
    max_points: number;
    task: string;
    title: string;
    url: string;
}

const RunningContest: React.FC = () => {
    const navigate = useNavigate();
    const [problems, setProblems] = useState<Problem[]>([]);
    const [isRunning, setIsRunning] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const lastVisitString = Cookies.get('contest-last-visit');
        const lastVisitTime = lastVisitString ? parseInt(lastVisitString, 10) : Date.now();
        const now = Date.now();

        const timeSpent = Math.floor((now - lastVisitTime) / 1000);
        const contestTimerString = Cookies.get('contest-timer');
        const initialTime = contestTimerString ? parseInt(contestTimerString, 10) : 0;
        console.log("Previuous time: " + initialTime);
        console.log("timeSpent: " + timeSpent);
        setElapsedTime(initialTime + timeSpent);

        Cookies.set('contest-last-visit', now.toString());
        Cookies.set('contest-timer', (initialTime + timeSpent).toString());

        return () => {
            Cookies.set('contest-last-visit', Date.now().toString());
        };
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime(prevTime => {
                    const newTime = prevTime + 1;
                    Cookies.set('contest-last-visit', Date.now().toString());
                    Cookies.set('contest-timer', newTime.toString());
                    return newTime;
                });
            }, 1000);
        } else if (!isRunning && interval !== null) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    useEffect(() => {
        try {
            const contestProblemsString = Cookies.get('contest-problems');

            if (!contestProblemsString) {
                navigate('/startcontest');
            } else {
                const contestProblems = JSON.parse(contestProblemsString);
                setProblems(contestProblems.problems);
            }
        } catch (error) {
            console.error('Error parsing contest-problems cookie:', error);
            navigate('/startcontest');
        }
    }, [navigate]);

    const handleQuitContest = () => {
        Cookies.remove('contest-problems');
        Cookies.remove('contest-timer');
        Cookies.remove('contest-last-visit');
        navigate('/startcontest');
    };

    const handleTimerToggle = () => {
        setIsRunning(!isRunning);
    };

    const formatTime = (time: number) => {
        const seconds = Math.floor(time % 60);
        const minutes = Math.floor((time / 60) % 60);
        const hours = Math.floor((time / 3600) % 24);

        return {
            hh: String(hours).padStart(2, '0'),
            mm: String(minutes).padStart(2, '0'),
            ss: String(seconds).padStart(2, '0'),
        };
    };

    const { hh, mm, ss } = formatTime(elapsedTime);

    return (
        <div className='contest-frame'>
            <div className='contest-timer'>
                {hh}:{mm}:{ss}
            </div>
            <div className='tasks-frame'>
                {problems.map((problem) => (
                    <div key={problem.id} className='task'>
                        <Container fluid>
                            <Row className='task-row'>
                                <Col md={8}>
                                    <div className='task-title'>
                                        <h3>{problem.title} ({problem.task})</h3>
                                    </div>
                                </Col>
                                <Col md={2}>
                                    <div className='task-link'>
                                        <a href={problem.url} target='_blank' rel="noopener noreferrer">Link to the task</a>
                                    </div>
                                </Col>
                                <Col md={1}>
                                    <div className='task-max-score'>
                                        {problem.max_points}
                                    </div>
                                </Col>
                                <Col md={1}>
                                    <div className='task-score'>
                                        0
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                ))}
            </div>
            <div className='contest-buttons'>
                <button className='quit-contest-button' onClick={handleQuitContest}>
                    <ImCross /> &nbsp; Leave contest
                </button>
                <button className='timer-contest-button' onClick={handleTimerToggle}>
                    {isRunning ?
                        (
                            <>
                                <FaStop /> &nbsp; Stop timer
                            </>
                        ) : (<>
                            <FaPlay /> &nbsp; Resume timer

                        </>
                        )}
                </button>
            </div>
        </div>
    );
}

export default RunningContest;
