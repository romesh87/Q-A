import React from 'react';

import classes from './App.module.css';
import NavBar from './components/NavBar/NavBar';
import Questions from './components/Questions/Questions';

function App() {
  return (
    <div className={classes.App}>
      <NavBar />
      <Questions />
    </div>
  );
}

export default App;
