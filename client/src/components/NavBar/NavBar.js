import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './NavBar.module.css';
import { logOut } from '../../actions/auth';
import { getQuestions } from '../../actions/question';

const NavBar = props => {
  const isAuthenticated = props.auth.isAuthenticated;
  const user = props.auth.user;

  const [searchText, setSearchText] = useState('');

  const searchHandler = e => {
    e.preventDefault();
    if (searchText === '') return;
    props.getQuestions(null, null, searchText);
  };

  return (
    <nav className={styles.navBar}>
      {/* <h1>Q&A</h1> */}
      <Link to='/'>
        <img
          className={styles.logo}
          src='/img/logos/q-and-a-1.png'
          alt='logo'
        />
      </Link>

      <form className={styles.searchBar} onSubmit={e => searchHandler(e)}>
        <input
          type='search'
          placeholder=' Search..'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        {/* <button
          type='submit'
          style={{ display: 'none' }}
          onClick={e => searchHandler(e)}
        >
          <i className='material-icons'>search</i>
        </button> */}
      </form>
      {isAuthenticated ? (
        <div className={styles.navLinks}>
          {/* <ion-icon name='person-circle-outline'></ion-icon> */}
          {user && <img src={`/img/users/${user.avatar}`} alt='user-img' />}
          {user && (
            <Link to='/profile' className={styles.username}>
              {' '}
              {user.name.split(' ')[0]}
            </Link>
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
  getQuestions: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { logOut, getQuestions })(NavBar);
