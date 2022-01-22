import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import { Garage } from './components/pages/Garage';
import { NotFound } from './components/pages/NotFound';
import { Winners } from './components/pages/Winners';

const App = () => {
  const [garagePageNumber, setGaragePageNumber] = useState(1);
  const [newCar, setNewCar] = useState({ name: '', color: '#000000' });
  const [updateCar, setUpdateCar] = useState({ name: '', color: '#000000', id: -1 });

  const [winnersPageNumber, setWinnersPageNumber] = useState(1);
  const [winnersConfig, setWinnersConfig] = useState({ sort: 'id', order: 'ASC' });

  return (
    <>
      <header>
        <Link to="/">Garage</Link>
        <Link to="/winners">Winners</Link>
      </header>
      <Routes>
        <Route
          path="/"
          element={(
            <Garage
              page={garagePageNumber}
              newCar={newCar}
              setNewCar={setNewCar}
              updateCar={updateCar}
              setUpdateCar={setUpdateCar}
              setPage={setGaragePageNumber}
            />
          )}
        />
        <Route
          path="winners"
          element={(
            <Winners
              page={winnersPageNumber}
              setPage={setWinnersPageNumber}
              config={winnersConfig}
              setConfig={setWinnersConfig}
            />
          )}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
