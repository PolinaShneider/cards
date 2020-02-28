import React, {Component} from 'react';
import './CardsWrapper.css';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

class CardsWrapper extends Component {
    render() {
        const {cards, deleteCard} = this.props;
        const content = cards.length > 0 ?
            cards.map(card => <Card key={card.id} {...card} deleteCard={deleteCard} />) :
            <div className="CardsWrapper-empty">No data. Wanna add something?</div>;

        return (
            <div className="CardsWrapper">
                {content}
            </div>
        );
    }
}

CardsWrapper.propTypes = {
    cards: PropTypes.array,
    deleteCard: PropTypes.func
};

export default CardsWrapper;
