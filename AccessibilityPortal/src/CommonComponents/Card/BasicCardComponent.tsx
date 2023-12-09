import React from "react";

// Interface for the props accepted by BasicCardComponent
interface CardProps {
    imageUrl: string;
    title: string;
    handleClick?: () => void;
}

// BasicCardComponent: A functional component to display a card with an image and title.
// It's designed to be clickable if a handleClick function is provided.
const BasicCardComponent: React.FC<CardProps> = ({imageUrl, title, handleClick}) => {
    return (
        <div className="card" style={{cursor: "pointer"}}>
            {/* Clickable area triggering the handleClick function if provided */}
            <a onClick={handleClick}>
                {/* Image of the card */}
                <img src={imageUrl} className="card-img-top" alt={title}/>
                {/* Card body with centered title */}
                <div className="card-body">
                    <h5 className="card-title" style={{textAlign: "center"}}>{title}</h5>
                </div>
            </a>
        </div>
    );
};

export default BasicCardComponent;
