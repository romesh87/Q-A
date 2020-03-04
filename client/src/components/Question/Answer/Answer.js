import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './Answer.module.css';
import EditForm from '../../EditForm/EditForm';
import {
  upvoteAnswer,
  downvoteAnswer,
  favouriteAnswer,
  unfavouriteAnswer,
  deleteAnswer,
  setEditing
} from '../../../actions/question';

const Answer = props => {
  const question = props.question.question;
  const auth = props.auth;
  const editing = props.question.editing;
  const hostName = `${window.location.protocol}//${window.location.host}`;

  const upvoteClickHandler = () => {
    props.upvoteAnswer(question._id, props.id);
  };

  const downvoteClickHandler = () => {
    props.downvoteAnswer(question._id, props.id);
  };

  const toogleFavouriteHandler = () => {
    if (props.isFavourite) {
      props.unfavouriteAnswer(question._id, props.id);
    } else {
      props.favouriteAnswer(question._id, props.id);
    }
  };

  const deleteClickHandler = () => {
    props.deleteAnswer(question._id, props.id);
  };

  const editClickHandler = () => {
    props.setEditing(props.id);
  };

  return (
    <Fragment>
      {editing === props.id && <EditForm text={props.text} ansId={props.id} />}
      <div
        className={styles.answer}
        style={
          props.isFavourite
            ? { backgroundColor: '#d8f5e4' }
            : { backgroundColor: '#ecf0f1' }
        }
      >
        <div className={styles.user}>
          <img src={`${hostName}/img/users/${props.avatar}`} alt='avatar' />
          <h3>{props.username}</h3>
        </div>
        <div className={styles.content}>
          <p>{props.text}</p>
          <div>
            <h3>
              Answered on: <Moment format='YYYY/MM/DD'>{props.date}</Moment>
            </h3>
            <div className={styles.buttons}>
              {auth.user._id === question.user._id && (
                <button
                  className={
                    props.isFavourite
                      ? styles.btnUnfavourite
                      : styles.btnFavourite
                  }
                  onClick={toogleFavouriteHandler}
                >
                  <span>
                    {props.isFavourite ? 'Unmark favourite' : 'Mark favourite'}
                  </span>
                </button>
              )}
              {auth.user._id === props.userId && (
                <div className={styles.buttons}>
                  <button className={styles.btnEdit} onClick={editClickHandler}>
                    Edit
                  </button>
                  <button className={styles.btnDelete}>
                    <i className='material-icons' onClick={deleteClickHandler}>
                      close
                    </i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.upvotes}>
          <h4>Upvotes</h4>
          <i className='material-icons md-48' onClick={upvoteClickHandler}>
            expand_less
          </i>
          <p>{props.upvotes.length}</p>
          <i className='material-icons md-48' onClick={downvoteClickHandler}>
            expand_more
          </i>
          {props.isFavourite && (
            <i className='material-icons md-48' style={{ color: '#27ae60' }}>
              check
            </i>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Answer.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  upvotes: PropTypes.array,
  isFavourite: PropTypes.bool.isRequired,
  upvoteAnswer: PropTypes.func.isRequired,
  downvoteAnswer: PropTypes.func.isRequired,
  favouriteAnswer: PropTypes.func.isRequired,
  unfavouriteAnswer: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    question: state.question
  };
};

export default connect(mapStateToProps, {
  upvoteAnswer,
  downvoteAnswer,
  favouriteAnswer,
  unfavouriteAnswer,
  deleteAnswer,
  setEditing
})(Answer);
