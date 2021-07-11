import React from 'react';
import './_mainButton.scss';

export default function MainButton({ buttonText,style }) {
    return (
        <div>
            <button className="button" style ={style}>
                {buttonText}
            </button>
        </div>
    )
}
