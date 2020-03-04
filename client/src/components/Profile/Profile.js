import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Profile.module.css';
import { updateUser } from '../../actions/auth';

const Profile = props => {
  const hostName = `${window.location.protocol}//${window.location.host}`;
  const user = props.auth.user;
  const fileInput = useRef();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    setFormData({
      ...formData,
      name: user.name,
      email: user.email,
      avatar: `${hostName}/img/users/${user.avatar}`
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { name, email } = formData;

  const onSubmitHandler = e => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('photo', fileInput.current.files[0]);

    props.updateUser(data);
  };

  console.log(styles.profile);
  //if (props.auth.isAuthenticated) return <Redirect to='/' />;

  return (
    <div className={styles.profile}>
      <h1>Edit user info</h1>
      <form onSubmit={e => onSubmitHandler(e)}>
        <span>Name:</span>
        <input
          type='text'
          name='name'
          value={formData.name}
          placeholder=' Name'
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <span>Email:</span>
        <input
          type='email'
          name='email'
          value={formData.email}
          placeholder=' Email'
          onChange={e =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <input
          type='file'
          name='photo'
          id='photo'
          accept='image/*'
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={e => {
            setFormData({
              ...formData,
              avatar: URL.createObjectURL(e.target.files[0])
            });
            console.log(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <label htmlFor='photo'>Choose new photo</label>
        <img src={formData.avatar} alt='avatar' />

        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

Profile.propTypes = {
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { updateUser })(Profile);
