import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import ProblemSolved from './ProblemsSolved';

import './DashboardCard.css';
import UserProfileItem from './UserProfileItem';
import RandomArticle from './RandomArticle';
import RandomProblem from './RandomProblem';

const DashboardCard: React.FC<{ content: string }> = ({ content }) => {
    let cardTitle = "";
    let cardBodyContent;

    switch (content) {
        case 'id-1':
            cardTitle = "Tasks solved";
            cardBodyContent = <ProblemSolved />;
            break;
        case 'id-2':
            cardTitle = "User stats";
            cardBodyContent = <UserProfileItem />;
            break;
        case 'id-3':
            cardTitle = "Vento";
            cardBodyContent = <img src='vento2.jpg' alt='vento' style={{ width: '80%' }} />;
            break;
        case 'id-4':
            cardTitle = "Random problem";
            cardBodyContent = <RandomProblem />;
            break;
        case 'id-5':
            cardTitle = "Random article";
            cardBodyContent = <RandomArticle />;
            break;
        default:
            cardTitle = "how dafuq are you seeing this";
            cardBodyContent = <p>No fr, you aren't meant to see this :(</p>;
            break;
    }

    return (
        <BootstrapCard className='dashboard-card'>
            <h1 className='dashboard-card-title'>{cardTitle}</h1>
            <BootstrapCard.Body className='dashboard-card-content'>
                {cardBodyContent}
            </BootstrapCard.Body>
        </BootstrapCard>
    );
};

export default DashboardCard;
