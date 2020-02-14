import React from 'react';
import PropTypes from 'prop-types';

import styles from './Alert.module.css';

const Alert = props => {
  let stylesString = styles.alert;
  if (props.type === 'success') {
    stylesString = stylesString + ' ' + styles.success;
  } else if (props.type === 'danger') {
    stylesString = stylesString + ' ' + styles.danger;
  }

  console.log(stylesString);

  return (
    <div className={stylesString}>
      <p>{props.text}</p>
    </div>
  );
};

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string
};

export default Alert;
