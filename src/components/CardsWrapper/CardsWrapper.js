import React, {Component} from 'react';
import './CardsWrapper.css';
import Card from '../Card/Card';
import PropTypes from 'prop-types';

class CardsWrapper extends Component {
    render() {
        const {cards, deleteCard, editCard, editingMode} = this.props;
        const content = cards.length > 0 ?
            cards.map(
                card => <Card key={card.id} {...card} editCard={editCard} editingMode={editingMode} deleteCard={deleteCard}/>
            ) : <div className="CardsWrapper-empty">No data. Wanna add something?</div>;

        return (
            <div className="CardsWrapper">
                {content}
            </div>
        );
    }
}

CardsWrapper.propTypes = {
    cards: PropTypes.array,
    editingMode: PropTypes.bool,
    deleteCard: PropTypes.func,
    editCard: PropTypes.func
};

export default CardsWrapper;
