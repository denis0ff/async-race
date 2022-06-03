import React from 'react';
import axios from 'axios';
import { getCar } from '../../utils/config';
import { IUpdateCarProps } from '../../utils/types';
import {
  Container, CarName, CarColor, Button,
} from './CreateCar';

export const UpdateCar = ({
  updateCar, setUpdateCar, changeGarage,
}: IUpdateCarProps) => {
  const { id, name, color } = updateCar;
  return (
    <Container>
      <CarName
        disabled={id === -1}
        value={name}
        maxLength={32}
        onChange={(event) => setUpdateCar((prevState) => ({
          id: prevState.id,
          color: prevState.color,
          name: event.target.value,
        }))}
      />
      <CarColor
        disabled={id === -1}
        value={color}
        onChange={(event) => setUpdateCar((prevState) => ({
          id: prevState.id,
          name: prevState.name,
          color: event.target.value,
        }))}
      />
      <Button
        disabled={id === -1}
        onClick={async () => {
          await axios.put(getCar(id), { name, color });
          changeGarage();
          setUpdateCar((prevState) => ({
            color: prevState.color,
            name: prevState.name,
            id: -1,
          }));
        }}
      >
        Update
      </Button>
    </Container>
  );
};
