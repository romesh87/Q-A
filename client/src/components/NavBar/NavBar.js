import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './NavBar.module.css';
import { logOut } from '../../actions/auth';

const NavBar = props => {
  const isAuthenticated = props.auth.isAuthenticated;
  const user = props.auth.user;

  return (
    <nav className={styles.navBar}>
      <h1>Q&A</h1>
      <form className={styles.searchBar}>
        <input type='search' placeholder=' Search..' />
        <button>
          <i className='material-icons'>search</i>
        </button>
      </form>
      {isAuthenticated ? (
        <div className={styles.navLinks}>
          <ion-icon name='person-circle-outline'></ion-icon>
          {user && (
            <span className={styles.username}> {user.name.split(' ')[0]}</span>
          )}
          <a
            href='#!'
            onClick={() => {
              props.logOut();
              console.log(props.history);
            }}
          >
            LOG OUT
          </a>
        </div>
      ) : (
        <div className={styles.navLinks}>
          <Link to='/login'>LOG IN</Link>
          <Link to='/signup'>SIGN UP</Link>
        </div>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { logOut })(NavBar);
