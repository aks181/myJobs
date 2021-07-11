import React from 'react';
import './_card.scss'

export default function Card({ cardTitle, content }) {
    return (
        <div className ="mycard">
            <div className="content">
                <div className="header">{cardTitle}</div>    
                <div className="description">
                <p>{content}</p>
                </div>
            </div>
        </div>
    )
}
