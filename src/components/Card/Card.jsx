import React from 'react';
import './Card.css';

export function Card(props) {
    const {title, description, image} = props;
    return (
        <div className="Card" key={Date.now()}>
            <div style={
                {backgroundImage: `url(${image})`}
            } className="Card-image"/>
            <div className="Card-info">
                <h1>
                    {title}
                </h1>
                <p>
                    {description}
                </p>
            </div>
        </div>
    );
}
