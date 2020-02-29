import React from 'react';
import logo from '../../assets/logo.svg';
import './Header.css';
import PropTypes from 'prop-types';

const Header = (props) => {
    const {openModal, toggleEditMode, editingMode} = props;
    const buttonText = editingMode ? 'Stop editing' : 'Start editing';
    return (
        <header className="Header">
            <img src={logo} className="Header-logo" alt="SEMrush" />
            <div className="Header-info">
                <h1>Webinars</h1>
                <p>
                    Here you can register and take part in educational webinars conducted
                    by the best digital marketing experts.
                </p>
                <button onClick={openModal}>
                    Add new
                </button>
                <button onClick={toggleEditMode}>
                    {buttonText}
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    openModal: PropTypes.func,
    toggleEditMode: PropTypes.func,
    editingMode: PropTypes.bool
};

export default Header;
