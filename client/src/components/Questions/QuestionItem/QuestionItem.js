import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

import styles from './QuestionItem.module.css';

const QuestionItem = props => {
  return (
    <div className={styles.questionItem}>
      <div className={styles.user}>
        <img src={props.user.avatar} alt='avatar' />
        <h3>{props.user.name}</h3>
      </div>
      <div className={styles.content}>
        <h1>{props.text}</h1>
        <h3>
          Asked on: <Moment format='YYYY/MM/DD'>{props.date}</Moment>
        </h3>
        <h4>Answers: {props.answers.length}</h4>
        {props.answers.length > 0 && <button>View Answers</button>}
      </div>
    </div>
  );
};

QuestionItem.propTypes = {
  user: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired
};

export default QuestionItem;
