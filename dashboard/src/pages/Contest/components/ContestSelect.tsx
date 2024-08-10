import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './ContestSelect.css';
import RunningContest from './RunningContest';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../Dashboard/components/NavBar';

const ContestSelect: React.FC = () => {
    const [rating, setRating] = useState<number | ''>('');
    const [problem_count, setProblemCount] = useState<number | ''>('');
    const navigate = useNavigate();


    useEffect(() => {
        try {
            const contestProblemsString = Cookies.get('contest-problems');

            if (contestProblemsString) {
                navigate('/contest');
            }
        } catch (error) {
            console.error('Error parsing contest-problems cookie:', error);
        }
    }, [navigate]);


    const handleContestStart = async (e: React.FormEvent) => {

        e.preventDefault();

        if (rating !== '' && problem_count !== '') {
            try {
                const response = await fetch('http://localhost:5000/api/training/getcontestproblems', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ rating: rating, problem_count: problem_count }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();

                Cookies.set('contest-problems', JSON.stringify(responseData), { expires: 1 });

                navigate('/contest')

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };

    return (
        <>
            <NavBar />
            <div className='contest-select'>
                <form onSubmit={handleContestStart} className='contest-start-form'>
                    <div>
                        <label htmlFor="rating">Contest rating (10-1000): </label>
                        <input
                            type="number"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            min="10"
                            max="1000"
                            required
                        />
                        <label htmlFor="problem-count">Problem count(1-8): </label>
                        <input
                            type="number"
                            id="problem-count"
                            value={problem_count}
                            onChange={(e) => setProblemCount(Number(e.target.value))}
                            min="1"
                            max="8"
                            required
                        />
                    </div>
                    <button type="submit">Start contest</button>
                </form>
            </div>
        </>
    );
}

export default ContestSelect;
