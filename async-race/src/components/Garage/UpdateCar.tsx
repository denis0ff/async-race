import styled from 'styled-components';
import React from 'react';
import axios from 'axios';
import { getCar } from '../../config';
import { IUpdateCarProps } from '../../types';

const Container = styled.div``;

const CarName = styled.input.attrs({ type: 'text' })``;

const CarColor = styled.input.attrs({ type: 'color' })``;

const Button = styled.button``;

export const UpdateCar = ({
  updateCar, setUpdateCar, changeGarage,
}: IUpdateCarProps) => {
  const { id, name, color } = updateCar;
  return (
    <Container>
      <CarName
        disabled={id === -1}
        value={name}
        maxLength={44}
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
