import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { GARAGE } from '../../config';
import { ICreateCarProps } from '../../types';

const Container = styled.div``;

const CarName = styled.input.attrs({ type: 'text' })``;

const CarColor = styled.input.attrs({ type: 'color' })``;

const Button = styled.button``;

export const CreateCar = ({
  newCar, setNewCar, changeGarage, isRace,
}: ICreateCarProps) => (
  <Container>
    <CarName
      value={newCar.name}
      maxLength={44}
      onChange={(event) => setNewCar((prevState) => ({
        color: prevState.color,
        name: event.target.value,
      }))}
    />
    <CarColor
      value={newCar.color}
      onChange={(event) => setNewCar((prevState) => ({
        name: prevState.name,
        color: event.target.value,
      }))}
    />
    <Button
      disabled={isRace}
      onClick={async () => {
        await axios.post(GARAGE, { name: newCar.name, color: newCar.color });
        changeGarage();
      }}
    >
      Create
    </Button>
  </Container>
);
