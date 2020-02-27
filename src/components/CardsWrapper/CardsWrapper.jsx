import React, {Component} from 'react';
import './CardsWrapper.css';
import {Card} from "../Card/Card";

export default class CardsWrapper extends Component {
    render() {
        const {cards} = this.props;
        const content = cards.length > 0 ?
            cards.map(card => <Card {...card}/>) :
            <div className="no-data">No data. Wanna add something?</div>;

        return (
            <div className="CardsWrapper">
                {content}
            </div>
        );
    }
}
