import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import styles from './Answer.module.css';

const Answer = props => {
  return (
    <div className={styles.answer}>
      <div className={styles.user}>
        <img src={props.avatar} alt='avatar' />
        <h3>{props.username}</h3>
      </div>
      <div className={styles.content}>
        <p>{props.text}</p>
        <h3>
          Answered on: <Moment format='YYYY/MM/DD'>{props.date}</Moment>
        </h3>
      </div>
      <div className={styles.upvotes}>
        <h4>Upvotes</h4>
        <i className='material-icons md-48'>expand_less</i>
        <p>{props.upvotes.length}</p>
        <i className='material-icons md-48'>expand_more</i>
        {props.isFavourite && (
          <i className='material-icons md-48' style={{ color: '#27ae60' }}>
            check
          </i>
        )}
      </div>
    </div>
  );
};

Answer.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  upvotes: PropTypes.array,
  isFavourite: PropTypes.bool.isRequired
};

export default Answer;
