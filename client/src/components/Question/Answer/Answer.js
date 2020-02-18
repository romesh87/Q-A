import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './Answer.module.css';
import {
  upvoteAnswer,
  downvoteAnswer,
  favouriteAnswer,
  unfavouriteAnswer
} from '../../../actions/question';

const Answer = props => {
  const upvoteClickHandler = () => {
    props.upvoteAnswer(props.questId, props.id);
  };

  const downvoteClickHandler = () => {
    props.downvoteAnswer(props.questId, props.id);
  };

  const favouriteClickHandler = () => {
    props.favouriteAnswer(props.questId, props.id);
  };

  const unfavouriteClickHandler = () => {
    props.unfavouriteAnswer(props.questId, props.id);
  };

  return (
    <div
      className={styles.answer}
      style={
        props.isFavourite
          ? { backgroundColor: '#d8f5e4' }
          : { backgroundColor: '#ecf0f1' }
      }
    >
      <div className={styles.user}>
        <img src={props.avatar} alt='avatar' />
        <h3>{props.username}</h3>
      </div>
      <div className={styles.content}>
        <p>{props.text}</p>
        <h3>
          Answered on: <Moment format='YYYY/MM/DD'>{props.date}</Moment>
        </h3>
        <button
          className={styles.btnFavourite}
          disabled={props.isFavourite}
          onClick={favouriteClickHandler}
        >
          <span className='material-icons'>check</span>
          <span>Favour</span>
        </button>
        <button
          className={styles.btnUnfavourite}
          disabled={!props.isFavourite}
          onClick={unfavouriteClickHandler}
        >
          <span className='material-icons'>close</span>
          <span>Unfavour</span>
        </button>
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
  );
};

Answer.propTypes = {
  id: PropTypes.string.isRequired,
  questId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  upvotes: PropTypes.array,
  isFavourite: PropTypes.bool.isRequired,
  upvoteAnswer: PropTypes.func.isRequired,
  downvoteAnswer: PropTypes.func.isRequired,
  favouriteAnswer: PropTypes.func.isRequired,
  unfavouriteAnswer: PropTypes.func.isRequired
};

export default connect(null, {
  upvoteAnswer,
  downvoteAnswer,
  favouriteAnswer,
  unfavouriteAnswer
})(Answer);
