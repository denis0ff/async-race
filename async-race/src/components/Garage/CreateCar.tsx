import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { GARAGE } from '../../utils/config';
import { ICreateCarProps } from '../../utils/types';

export const Container = styled.div`
  display: flex;
  gap: .1rem;
`;

export const CarName = styled.input.attrs({ type: 'text' })`
  padding: .1rem .5rem;
`;

export const CarColor = styled.input.attrs({ type: 'color' })`
  cursor: pointer;
`;

export const Button = styled.button`
  padding: .1rem .5rem;
  cursor: pointer;
`;

export const CreateCar = ({
  newCar, setNewCar, changeGarage, isRace,
}: ICreateCarProps) => (
  <Container>
    <CarName
      value={newCar.name}
      maxLength={32}
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
