import React from "react";

interface CardProps {
    imageUrl: string;
    title: string;
    handleClick?: () => void;
}

const BasicCardComponent: React.FC<CardProps> = ({ imageUrl, title, handleClick}) => {
    return (
        <div className="card" style={{cursor: "pointer"}}>
            <a onClick={handleClick}>
            <img src={imageUrl} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title" style={{ textAlign: "center" }}>{title}</h5>
            </div></a>
        </div>
    );
};

export default BasicCardComponent;