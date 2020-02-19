import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './QuestionForm.module.css';
import { addQuestion } from '../../../actions/question';

const QuestionForm = props => {
  const [text, setText] = useState('');

  const onSubmitHandler = e => {
    e.preventDefault();
    props.addQuestion(text);
  };

  return (
    <form className={styles.questionForm} onSubmit={e => onSubmitHandler(e)}>
      <textarea
        placeholder='Ask a question..'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type='submit' disabled={text === ''}>
        Submit
      </button>
    </form>
  );
};

QuestionForm.propTypes = {
  addQuestion: PropTypes.func.isRequired
};

export default connect(null, { addQuestion })(QuestionForm);
