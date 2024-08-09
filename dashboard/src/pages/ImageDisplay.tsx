import React from 'react';
import './ImageDisplay.css';

interface ImageDisplayProps {
    imageUrl: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl }) => {
    return (
        <div className="image-container">
            <img src={imageUrl} alt="Displayed" className="image" />
        </div>
    );
};

export default ImageDisplay;
