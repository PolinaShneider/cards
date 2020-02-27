import React from 'react';
import "./Pagination.css";
import {Link} from "react-router-dom";

export const Pagination = ({postsPerPage, totalPosts, current}) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="Pagination">
            {pageNumbers.map(number => (
                <Link className={number === current ? 'active': ''} to={`/?page=${number}`}>{number}</Link>
            ))}
        </div>
    );
};
