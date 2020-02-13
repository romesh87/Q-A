import React from 'react';
import PropTypes from 'prop-types';

import avatar from './avatar.png';
import styles from './QuestionItem.module.css';

const QuestionItem = props => {
  return (
    <div className={styles.questionItem}>
      <div className={styles.user}>
        <img src={avatar} alt='avatar' />
        <h3>username</h3>
      </div>
      <div className={styles.content}>
        <h1>What is the name of the deepest lake on Earth?</h1>
        <h3>Asked on: 2020/02/13</h3>
        <h4>Answers: 2</h4>
        <button>View Answers</button>
      </div>
    </div>
  );
};

QuestionItem.propTypes = {};

export default QuestionItem;
