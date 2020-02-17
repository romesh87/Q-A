import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Questions.module.css';
import QuestionItem from './QuestionItem/QuestionItem';
import Spinner from '../UI/Spinner/Spinner';
import { getQuestions } from '../../actions/question';

const Questions = props => {
  const questions = props.question.questions;
  const auth = props.auth;

  useEffect(() => {
    props.getQuestions();
  }, []);

  return (
    <div className={styles.questions}>
      {questions.loading ? (
        <Spinner />
      ) : (
        questions.map(question => (
          <QuestionItem
            key={question._id}
            id={question._id}
            user={question.user}
            text={question.text}
            date={question.date}
            answers={question.answers}
          />
        ))
      )}
    </div>
  );
};

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    question: state.question,
    auth: state.auth
  };
};

export default connect(mapStateToProps, { getQuestions })(Questions);
