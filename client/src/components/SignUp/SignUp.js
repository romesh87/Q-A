import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './SignUp.module.css';
import { signUp } from '../../actions/auth';

const SignUp = props => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: ''
  });

  const { name, email, password1, password2 } = formData;

  const onSubmitHandler = e => {
    e.preventDefault();
    if (password1 !== password2) {
      return window.alert("Password doesn't match!");
    }

    props.signUp(name, email, password1);
  };

  if (props.auth.isAuthenticated) return <Redirect to='/' />;

  return (
    <div className={styles.signup}>
      <h1>Sign Up</h1>
      <form onSubmit={e => onSubmitHandler(e)}>
        <input
          type='text'
          name='name'
          value={formData.name}
          placeholder=' Name'
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <input
          type='email'
          name='email'
          value={formData.email}
          placeholder=' Email'
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <small>*This website uses Gravatar </small>
        <input
          type='password'
          name='password1'
          value={formData.password1}
          placeholder=' Password'
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <input
          type='password'
          name='password2'
          value={formData.password2}
          placeholder=' Confirm Password'
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <button type='submit'>Sign Up</button>
      </form>
      <p>
        Already registered? <Link to='/login'> Log In</Link>
      </p>
    </div>
  );
};

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { signUp })(SignUp);
