import React from 'react';
import './Card.css';
import {faTrash, faPen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import notifier from 'codex-notifier';
import PropTypes from 'prop-types';

const Card = (props) => {
    const {title, description, image, id, deleteCard, editCard, bigCover, editingMode} = props;

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
            {
                editingMode && (
                    <div>
                        <span className="Card-edit" onClick={() => editCard({title, description, image, bigCover, id})}>
                            <FontAwesomeIcon icon={faPen}/>
                        </span>
                        <span className="Card-delete" onClick={() => removeCard()}>
                            <FontAwesomeIcon icon={faTrash}/>
                        </span>
                    </div>
                )
            }
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
    deleteCard: PropTypes.func,
    editCard: PropTypes.func,
    editingMode: PropTypes.bool
};

export default Card;
