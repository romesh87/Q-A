import React from 'react';
import PropTypes from 'prop-types';

import styles from './Questions.module.css';
import QuestionItem from './QuestionItem/QuestionItem';

const Questions = props => {
  return (
    <div className={styles.questions}>
      <QuestionItem />
    </div>
  );
};

Questions.propTypes = {};

export default Questions;
