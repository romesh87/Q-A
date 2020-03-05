import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './QuestionItem.module.css';
import { deleteQuestion } from '../../../actions/question';

const QuestionItem = props => {
  const auth = props.auth;

  const deleteClickHandler = () => {
    props.deleteQuestion(props.id);
  };

  return (
    <div className={styles.questionItem}>
      <div className={styles.user}>
        <img src={`/img/users/${props.user.avatar}`} alt='avatar' />
        <h3>{props.user.name}</h3>
      </div>
      <div className={styles.content}>
        <h1>{props.text}</h1>
        <div>
          <h3>
            Asked on: <Moment format='YYYY/MM/DD'>{props.date}</Moment>
          </h3>
          <div className={styles.buttons}>
            <Link to={`/questions/${props.id}`}>
              Answers: {props.answers.length}
            </Link>
            {auth.user
              ? auth.user._id === props.userId && (
                  <button className={styles.btnDelete}>
                    <i className='material-icons' onClick={deleteClickHandler}>
                      close
                    </i>
                  </button>
                )
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

QuestionItem.propTypes = {
  user: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  auth: PropTypes.object
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { deleteQuestion })(QuestionItem);
