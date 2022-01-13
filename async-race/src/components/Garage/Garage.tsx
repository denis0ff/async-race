/* eslint-disable react/prop-types */
import styled from 'styled-components';
import React, { useState } from 'react';
import axios from 'axios';
import { GARAGE } from '../../config';
import Models from '../../assets/models.json';
// import ICar from '../../types';

const Wrapper = styled.section``;

const Container = styled.div``;

const CarName = styled.input.attrs({ type: 'text' })``;

const CarColor = styled.input.attrs({ type: 'color' })``;

const Button = styled.button``;

const List = styled.ul``;

export const Garage = ({ children }) => {
  const [newCarName, setNewCarName] = useState('');
  const [newCarColor, setNewCarColor] = useState('');

  return (
    <>
      <Wrapper>
        <Container>
          <CarName onChange={(event) => setNewCarName(event.target.value)} />
          <CarColor onChange={(event) => setNewCarColor(event.target.value)} />
          <Button onClick={() => (axios.post(GARAGE, { name: newCarName, color: newCarColor }))}>
            Create
          </Button>
        </Container>
        <Container>
          <CarName />
          <CarColor />
          <Button>Update</Button>
        </Container>
        <Container>
          <Button>Race</Button>
          <Button>Reset</Button>
          <Button onClick={async () => {
            const carNames = [...Object.values(JSON.parse(JSON.stringify(Models)))];
            const arr = Array.from({ length: 100 }, () => (
              {
                name: carNames[Math.floor(Math.random() * carNames.length)],
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
              }));
            arr.forEach((item) => axios.post(GARAGE, item));
          }}
          >
            Generate Cars
          </Button>
        </Container>
      </Wrapper>
      <Wrapper>
        <List>
          <h3>
            Garage(
            {children.length}
            )
          </h3>
          {children}
        </List>
      </Wrapper>
    </>
  );
};
