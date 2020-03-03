import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

import styles from './ResetPassword.module.css';
import { setAlert } from '../../actions/alert';

const ResetPassword = props => {
  const [formData, setFormData] = useState({
    password1: '',
    password2: ''
  });

  const { password1, password2 } = formData;

  const onSubmitHandler = async e => {
    e.preventDefault();
    if (password1 !== password2) {
      return props.setAlert("Password doesn't match", 'danger');
    }

    try {
      await axios.post(
        `http://localhost:3000/api/users/resetPassword/${props.match.params.resetToken}`,
        { newPassword: password1 }
      );
      props.setAlert(`Password has been successfully reset`, 'success');
      setTimeout(() => {
        props.history.push('/login');
      }, 5000);
    } catch (err) {
      props.setAlert('Error resetting password', 'danger');
    }
  };

  if (props.auth.isAuthenticated) return <Redirect to='/' />;

  return (
    <div className={styles.resetPassword}>
      <h1>Enter new password</h1>
      <form onSubmit={e => onSubmitHandler(e)}>
        <input
          type='password'
          name='password1'
          value={formData.password1}
          placeholder='New Password'
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          minLength='6'
        />
        <input
          type='password'
          name='password2'
          value={formData.password2}
          placeholder=' Confirm Password'
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          minLength='6'
        />
        <button type='submit'>Reset</button>
      </form>
    </div>
  );
};

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { setAlert })(ResetPassword);
