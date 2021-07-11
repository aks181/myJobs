import React from 'react';
import Card from './Card';
import './_card.scss'

const gibberish = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut velit architecto laborum odit non nihil! Laudantium quae cumque fugit, quibusdam consectetur!';

const cardTitle = ['Get More Visibility', 'Organize your candidates', 'Verify their Abilities'];

export default function HomeBody() {
    return (
        <div>
            <h3>Why Us</h3>
            <br />
            <div className= "cardRow">
                <Card cardTitle = {cardTitle[0]} content = {gibberish}/>
                <Card cardTitle = {cardTitle[1]} content = {gibberish}/>
                <Card cardTitle = {cardTitle[2]} content = {gibberish}/>
            </div>
        </div>
    )
}
