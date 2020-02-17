import React, { useEffect, Fragment } from 'react';
import Moment from 'react-moment';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Question.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Answer from './Answer/Answer';
import { getQuestion } from '../../actions/question';

const Question = props => {
  const loading = props.question.loading;
  const question = props.question.question;
  const isAuth = props.auth.isAuthenticated;

  useEffect(() => {
    props.getQuestion(props.match.params.id);
  }, []);

  if (!isAuth) return <Redirect to='/login' />;

  return loading ||
    question === null ||
    question._id !== props.match.params.id ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className={styles.question}>
        <div className={styles.user}>
          <img src={question.user.avatar} alt='avatar' />
          <h3>{question.user.name}</h3>
        </div>
        <div className={styles.content}>
          <h1>{question.text}</h1>
          <h3>
            Asked on: <Moment format='YYYY/MM/DD'>{question.date}</Moment>
          </h3>
          <h4>Answers: {question.answers.length}</h4>
        </div>
      </div>
      {question.answers.length > 0 ? (
        question.answers.map(ans => (
          <Answer
            key={ans._id}
            username={ans.user.name}
            avatar={ans.user.avatar}
            text={ans.text}
            date={ans.date}
            upvotes={ans.upvotes}
            isFavourite={ans.isFavourite}
          />
        ))
      ) : (
        <p>No answers yet</p>
      )}
    </Fragment>
  );
};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { question: state.question, auth: state.auth };
};

export default connect(mapStateToProps, { getQuestion })(Question);