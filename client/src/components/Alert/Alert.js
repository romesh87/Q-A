import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Alert.module.css';

const Alert = props => {
  return props.alert !== null && props.alert.length > 0
    ? props.alert.map(el => {
        let stylesString = styles.alert;
        if (el.type === 'success') {
          stylesString = stylesString + ' ' + styles.success;
        } else if (el.type === 'danger') {
          stylesString = stylesString + ' ' + styles.danger;
        }

        return (
          <div key={el.id} className={stylesString}>
            <p>{el.text}</p>
          </div>
        );
      })
    : null;
};

Alert.propTypes = {
  alert: PropTypes.array
};

const mapStateToProps = state => {
  return {
    alert: state.alert
  };
};

export default connect(mapStateToProps)(Alert);
