import React from 'react';
// import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import { Garage } from './components/Garage/Garage';

const App = () => {
  console.log('app');

  return (
    <>
      <Header />
      <Garage />
    </>
  );
};

export default App;
