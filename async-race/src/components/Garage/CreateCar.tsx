import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';
import { GARAGE } from '../../config';
import { ReturnPromiseVoid } from '../../types';

const Container = styled.div``;

const CarName = styled.input.attrs({ type: 'text' })``;

const CarColor = styled.input.attrs({ type: 'color' })``;

const Button = styled.button``;

export const CreateCar = ({ changeGarage }: { changeGarage: ReturnPromiseVoid }) => {
  const [newCarName, setNewCarName] = useState('');
  const [newCarColor, setNewCarColor] = useState('#000000');

  return (
    <Container>
      <CarName onChange={(event) => setNewCarName(event.target.value)} />
      <CarColor onChange={(event) => setNewCarColor(event.target.value)} />
      <Button onClick={() => {
        axios.post(GARAGE, { name: newCarName, color: newCarColor });
        changeGarage();
      }}
      >
        Create
      </Button>
    </Container>
  );
};
