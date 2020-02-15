import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.module.css';
// import { setAuthHeader } from './utils/setAuthHeader';
import { loadUser } from './actions/auth';
import NavBar from './components/NavBar/NavBar';
import Questions from './components/Questions/Questions';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import Alert from './components/Alert/Alert';

function App(props) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        {/* <Fragment> */}
        <NavBar />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/' component={Questions} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={LogIn} />
          </Switch>
        </section>
        {/* </Fragment> */}
      </Router>
    </Provider>
  );
}

export default App;
