import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import { Garage } from './pages/Garage';
import { NotFound } from './pages/NotFound';
import { Winners } from './pages/Winners';

const NavLink = styled(Link)`
  margin: 0 .5rem;
  padding: .2rem 1rem;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  outline: 3px solid #b3065c;
`;

const Header = styled.header`
  margin-bottom: .5rem;
  display: flex;
  height: 100%; 
`;

const App = () => {
  const [garagePageNumber, setGaragePageNumber] = useState(1);
  const [newCar, setNewCar] = useState({ name: '', color: '#000000' });
  const [updateCar, setUpdateCar] = useState({ name: '', color: '#000000', id: -1 });

  const [winnersPageNumber, setWinnersPageNumber] = useState(1);
  const [winnersConfig, setWinnersConfig] = useState({ sort: 'wins', order: 'DESC' });

  return (
    <>
      <Header>
        <NavLink to="/">Garage</NavLink>
        <NavLink to="/winners">Winners</NavLink>
      </Header>
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
