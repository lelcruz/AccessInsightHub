import React from "react";

interface CardProps {
    imageUrl: string;
    title: string;
}

const BasicCardComponent: React.FC<CardProps> = ({ imageUrl, title}) => {
    return (
        <div className="card" style={{ width: "12rem" }}>
            <img src={imageUrl} className="card-img-top" alt={title} />
            <div className="card-body">
                <h5 className="card-title" style={{ textAlign: "center" }}>{title}</h5>
            </div>
        </div>
    );
};

export default BasicCardComponent;