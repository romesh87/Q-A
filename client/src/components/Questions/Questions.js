import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Questions.module.css';
import QuestionItem from './QuestionItem/QuestionItem';
import QuestionForm from './QuestionForm/QuestionForm';
import Spinner from '../UI/Spinner/Spinner';
import Pagination from '../Pagination/Pagination';
import { getQuestions } from '../../actions/question';

const ITEMS_PER_PAGE = 10;

const Questions = props => {
  const questions = props.question.questions;
  const auth = props.auth;

  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    props.getQuestions(1, ITEMS_PER_PAGE);
    setCurrentPage('1');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageOnClickHandler = e => {
    props.getQuestions(
      e.target.textContent,
      ITEMS_PER_PAGE,
      props.question.searchText
    );
    setCurrentPage(e.target.textContent);
    window.scrollTo({
      top: 0,
      left: 0
    });
  };

  return (
    <Fragment>
      <div className={styles.questions}>
        {auth.isAuthenticated && <QuestionForm />}
        {props.question.loading ? (
          <Spinner />
        ) : (
          questions.map(question => (
            <QuestionItem
              key={question._id}
              id={question._id}
              user={question.user}
              userId={question.user._id}
              text={question.text}
              date={question.date}
              answers={question.answers}
            />
          ))
        )}
      </div>
      <Pagination
        resultsCount={props.question.questionsCount}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onClickHandler={pageOnClickHandler}
      />
    </Fragment>
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
