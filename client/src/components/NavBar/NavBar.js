import React from 'react';
import PropTypes from 'prop-types';

import styles from './NavBar.module.css';

const NavBar = props => {
  return (
    <nav className={styles.navBar}>
      <h1>Q&A</h1>
      <form className={styles.searchBar}>
        <input type='search' placeholder=' Search..' />
        <button>
          <i className='material-icons'>search</i>
        </button>
      </form>
      <div className={styles.navLinks}>
        <a href='!#'>Log In</a>
        <a href='!#'>Sign Up</a>
      </div>
    </nav>
  );
};

NavBar.propTypes = {};

export default NavBar;
