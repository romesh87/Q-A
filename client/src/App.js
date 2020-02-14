import React, { Fragment } from 'react';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import classes from './App.module.css';
import NavBar from './components/NavBar/NavBar';
import Questions from './components/Questions/Questions';

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <NavBar />
        <Questions />
      </Fragment>
    </Provider>
  );
}

export default App;
