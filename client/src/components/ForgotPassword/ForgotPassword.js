import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import styles from './ForgotPassword.module.css';
//import { logIn } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const ForgotPassword = props => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/users/forgotPassword', {
        email
      });
      props.setAlert(`Email sent to ${email}`, 'success');
    } catch (err) {
      props.setAlert(err.response.data.msg, 'danger');
    }
  };

  if (props.auth.isAuthenticated) return <Redirect to='/' />;

  return (
    <div className={styles.forgotPassword}>
      <h1>Enter your email</h1>
      <form onSubmit={e => onSubmitHandler(e)}>
        <input
          type='email'
          name='email'
          value={formData.email}
          placeholder='Email'
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          required
        />
        <button type='submit'>Send Email</button>
      </form>
    </div>
  );
};

ForgotPassword.propTypes = {
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { setAlert })(ForgotPassword);
