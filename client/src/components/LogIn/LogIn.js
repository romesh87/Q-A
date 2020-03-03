import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './LogIn.module.css';
import { logIn } from '../../actions/auth';

const LogIn = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onSubmitHandler = e => {
    e.preventDefault();
    props.logIn(email, password);
  };

  if (props.auth.isAuthenticated) return <Redirect to='/' />;

  return (
    <div className={styles.login}>
      <h1>Log In</h1>
      <form onSubmit={e => onSubmitHandler(e)}>
        <input
          type='email'
          name='email'
          value={formData.email}
          placeholder='Email'
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          placeholder='Password'
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <button type='submit'>Log In</button>
      </form>
      <p>
        Not yet registered? <Link to='/signup'> Sign Up</Link>
      </p>
      <p>
        Forgot your password? <Link to='/forgotPassword'> Click here</Link>
      </p>
    </div>
  );
};

LogIn.propTypes = {
  logIn: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { logIn })(LogIn);
