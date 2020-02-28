import React from 'react';
import './Pagination.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Pagination = ({postsPerPage, totalPosts, current}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="Pagination">
            {pageNumbers.map(number => (
                <Link key={number} className={number === current ? 'active': ''} to={`/?page=${number}`}>{number}</Link>
            ))}
        </div>
    );
};

Pagination.propTypes = {
    postsPerPage: PropTypes.number,
    totalPosts: PropTypes.number,
    current: PropTypes.number
};

export default Pagination;
