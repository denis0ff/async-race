import React from 'react';
import axios from 'axios';
import { GARAGE } from '../../utils/config';
import { ReturnPromiseVoid } from '../../utils/types';
import { Button } from './CreateCar';

const randomCarName = () => {
  const manufactures = ['Volkswagen', 'Volvo', 'Tesla', 'BMW', 'Audi', 'Toyota', 'Skoda', 'Rolls-Royce', 'Renault', 'Pontiac'];
  const models = ['Traveller', 'Rifter', 'Cascada', 'Navara', 'Outlander', 'Montego', 'Aviator', 'GX', 'Carnival', 'Genesis'];
  const manufacture = manufactures[Math.floor(Math.random() * manufactures.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${manufacture} ${model}`;
};

const randomCarColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const GenerateCars = ({ changeGarage, isDisabled }:
{ changeGarage: ReturnPromiseVoid, isDisabled: boolean }) => {
  const handleClick = () => {
    const randomCars = Array.from({ length: 100 }, () => (
      {
        name: randomCarName(),
        color: randomCarColor(),
      }));
    Promise.all(randomCars.map((car) => axios.post(GARAGE, car))).then(changeGarage);
  };
  return (
    <Button
      disabled={isDisabled}
      onClick={handleClick}
    >
      Generate Cars
    </Button>
  );
};
