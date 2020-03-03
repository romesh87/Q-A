import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.module.css';
// import { setAuthHeader } from './utils/setAuthHeader';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NavBar from './components/NavBar/NavBar';
import Questions from './components/Questions/Questions';
import Question from './components/Question/Question';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import Alert from './components/Alert/Alert';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';

function App(props) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/' component={Questions} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={LogIn} />
            {/* <Route exact path='/questions/:id' component={Question} /> */}
            <Route exact path='/forgotPassword' component={ForgotPassword} />
            <Route
              exact
              path='/resetPassword/:resetToken'
              component={ResetPassword}
            />
            <PrivateRoute
              exact
              path='/questions/:id'
              component={Question}
            ></PrivateRoute>
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
