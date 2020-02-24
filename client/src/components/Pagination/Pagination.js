import React from 'react';
import PropTypes from 'prop-types';

import styles from './Pagination.module.css';

const Pagination = props => {
  const pages = Math.floor(props.resultsCount / props.itemsPerPage);
  let pagesArray = [];

  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul>
        {pagesArray.map(page => (
          <li
            key={page}
            onClick={e => props.onClickHandler(e)}
            style={{
              backgroundColor:
                +props.currentPage === page ? '#bdc3c7' : 'white',
              color: +props.currentPage === page ? 'white' : 'black'
            }}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  resultsCount: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired
};

export default Pagination;
