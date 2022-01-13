import React, {
  useState, useEffect, Dispatch, SetStateAction,
} from 'react';
import axios from 'axios';
// import { Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import { Garage } from './components/Garage/Garage';
import { GARAGE } from './config';
import ICar from './types';
import { Car } from './components/Garage/Car';

const App = () => {
  const [garage, setGarage]: [ICar[], Dispatch<SetStateAction<ICar[]>>] = useState([]);

  useEffect(() => {
    axios.get<ICar[]>(GARAGE).then(
      ({ data }) => setGarage(data),
    );
  }, []);

  return (
    <>
      <Header />
      <Garage>
        {garage.map((car) => <Car key={car.id} id={car.id} name={car.name} color={car.color} />)}
      </Garage>
    </>
  );
};

export default App;
