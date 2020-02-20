import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import styles from './EditForm.module.css';
import Backdrop from '../UI/Backdrop/Backdrop';

const EditForm = props => {
  const [text, setText] = useState('');

  const onSubmitHandler = e => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Backdrop show />
      <form
        className={styles.editForm}
        style={{ display: props.show ? 'block' : 'none' }}
        onSubmit={e => onSubmitHandler(e)}
      >
        <textarea value={text} onChange={e => setText(e.target.value)} />
        <div className={styles.buttons}>
          <button className={styles.btnCancel}>Cancel</button>
          <button
            type='submit'
            className={styles.btnSubmit}
            disabled={text === ''}
          >
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
};

EditForm.propTypes = {
  show: PropTypes.bool
};

export default EditForm;
