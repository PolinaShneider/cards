import React from 'react';
import './Card.css';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import notifier from 'codex-notifier';
import PropTypes from 'prop-types';

const Card = (props) => {
    const {title, description, image, id, deleteCard, bigCover} = props;

    function removeCard() {
        notifier.show({
            message: 'You are going to delete card. Are you sure?',
            type: 'confirm',
            okText: 'Yes',
            cancelText: 'No, wait',
            okHandler: () => {
                deleteCard(id);
            }
        });
    }

    const classes = ['Card'];

    if (bigCover) {
        classes.push('Card--big')
    }

    return (
        <div className={classes.join(' ')}>
            <span className="Card-delete" onClick={() => removeCard()}>
                <FontAwesomeIcon icon={faTrash}/>
            </span>
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
};

Card.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    id: PropTypes.string,
    bigCover: PropTypes.bool,
    deleteCard: PropTypes.func
};

export default Card;
