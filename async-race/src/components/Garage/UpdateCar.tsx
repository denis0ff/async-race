import styled from 'styled-components';
import React, {
  Dispatch, SetStateAction, useState,
} from 'react';
import axios from 'axios';
import { GARAGE } from '../../config';
import { ReturnPromiseVoid } from '../../types';

const Container = styled.div``;

const CarName = styled.input.attrs({ type: 'text' })``;

const CarColor = styled.input.attrs({ type: 'color' })``;

const Button = styled.button``;

export const UpdateCar = ({ updateCar, setUpdateCar, changeGarage }:
{
  updateCar: number | null,
  setUpdateCar: Dispatch<SetStateAction<number | null>>,
  changeGarage: ReturnPromiseVoid
}) => {
  const [newCarName, setNewCarName] = useState('');
  const [newCarColor, setNewCarColor] = useState('#000000');

  return (
    <Container>
      <CarName
        disabled={updateCar === null}
        onChange={(event) => setNewCarName(event.target.value)}
      />
      <CarColor onChange={(event) => setNewCarColor(event.target.value)} />
      <Button
        disabled={updateCar === null}
        onClick={() => {
          axios.put(`${GARAGE}/${updateCar}`, { name: newCarName, color: newCarColor });
          changeGarage();
          setUpdateCar(null);
        }}
      >
        Update
      </Button>
    </Container>
  );
};
