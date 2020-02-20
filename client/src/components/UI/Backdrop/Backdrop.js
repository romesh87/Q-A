import React from 'react';
import PropTypes from 'prop-types';

import styles from './Backdrop.module.css';

const BackDrop = props => {
  return (
    <div
      className={styles.backdrop}
      style={{ display: props.show ? 'block' : 'none' }}
    ></div>
  );
};

BackDrop.propTypes = {
  show: PropTypes.bool
};

export default BackDrop;
