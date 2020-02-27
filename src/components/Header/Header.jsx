import React from 'react';
import logo from '../../assets/logo.svg';
import './Header.css';

export function Header(props) {
    const {openModal} = props;
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
            </div>
        </header>
    );
}
