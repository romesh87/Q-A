import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './EditForm.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';
import { clearEditing, updateAnswer } from '../../actions/question';

const EditForm = props => {
  const editing = props.question.editing;
  const question = props.question.question;

  const [text, setText] = useState(props.text);

  const onSubmitHandler = e => {
    e.preventDefault();
    props.updateAnswer(question._id, props.ansId, text);
    props.clearEditing();
  };

  const onCancelHandler = () => {
    props.clearEditing();
  };

  return (
    <Fragment>
      <Backdrop show={editing !== null} />
      <form
        className={styles.editForm}
        style={{
          transform: editing ? 'translateY(-500px)' : 'translateY(-500vh)'
        }}
        onSubmit={e => onSubmitHandler(e)}
      >
        <textarea value={text} onChange={e => setText(e.target.value)} />
        <div className={styles.buttons}>
          <button className={styles.btnCancel} onClick={onCancelHandler}>
            Cancel
          </button>
          <button
            type='submit'
            className={styles.btnSubmit}
            disabled={text === '' || text === props.text}
          >
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
};

EditForm.propTypes = {
  question: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  ansId: PropTypes.string.isRequired,
  clearEditing: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { question: state.question };
};

export default connect(mapStateToProps, { clearEditing, updateAnswer })(
  EditForm
);
