import React from 'react';
import './LoadingStats.css';

const LoadingStats: React.FC = () => {
    return (
        <div className="loading-stats">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingStats;
