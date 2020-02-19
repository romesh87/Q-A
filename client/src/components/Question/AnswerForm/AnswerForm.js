import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './AnswerForm.module.css';
import { addAnswer } from '../../../actions/question';

const AnswerForm = props => {
  const question = props.question.question;

  const [text, setText] = useState('');

  const onSubmitHandler = e => {
    e.preventDefault();
    props.addAnswer(question._id, text);
  };

  return (
    <form className={styles.answerForm} onSubmit={e => onSubmitHandler(e)}>
      <textarea
        placeholder='Answer question..'
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type='submit' disabled={text === ''}>
        Submit
      </button>
    </form>
  );
};

AnswerForm.propTypes = {
  addAnswer: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    question: state.question
  };
};

export default connect(mapStateToProps, { addAnswer })(AnswerForm);
