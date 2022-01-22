import styled, { css, keyframes } from 'styled-components';
import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import axios from 'axios';
import {
  GARAGE, getPageCars, getWinner, LIMIT_GARAGE, WINNERS,
} from '../../config';
import { UpdateCar } from '../Garage/UpdateCar';
import { CreateCar } from '../Garage/CreateCar';
import {
  ICar, IGarageProps, INewWinner,
} from '../../types';
import { Car } from '../Garage/Car';
import { Pagination } from '../global/Pagination';
import { GenerateCars } from '../Garage/GenerateCars';

const Wrapper = styled.section`
  position: relative;
`;

const Container = styled.div``;

const Button = styled.button``;

const List = styled.ul`
  overflow-x: hidden;
`;

const transition = keyframes`
0% {
  opacity: 0;
}
30% {
  opacity: 1;
}
70% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`;

const Winner = styled.h3 <{ newWinner: number }>`
  position: absolute;
  top: 50%;
  margin: 0 25%;
  width: 50%;
  font-size: 2rem;
  text-align: center;
  z-index: 100;
  opacity: 0;
  ${(props) => ((props.newWinner)
    ? css`
    animation: ${transition} 5s ease-in 1;
    `
    : '')
}
`;

const initReset = (initialCount: number) => (initialCount);

const initWinner = (initialWinner: INewWinner) => ({ ...initialWinner });

const updateWinnerData = (newWinner: INewWinner) => {
  const { id, time } = newWinner;
  const path = getWinner(id);
  axios.get(path)
    .then(({ data }) => axios.put(path, {
      wins: data.wins + 1, time: (data.time > time ? time : data.time),
    }))
    .catch(({ response }) => {
      if (response.status === 404) axios.post(WINNERS, { id, wins: 1, time });
    });
  return { ...newWinner };
};

const updateWinner = (state: INewWinner, action: INewWinner) => {
  if (state.id === -1 && action.id !== -1) return updateWinnerData(action);
  if (action.id === -1) return initWinner(action);
  return state;
};

export const Garage = (props: IGarageProps, { initialCount = 0, initialWinner = { id: -1, name: '', time: 0 } }: { initialCount: number, initialWinner: INewWinner }) => {
  const garageProps = { ...props };
  const [garage, setGarage] = useState<ICar[]>([]);

  const changeGarage = useCallback(() => axios.get<ICar[]>(GARAGE)
    .then(({ data }) => setGarage(data)), [garage]);

  useEffect(() => { changeGarage(); }, []);

  const [isRace, setIsRace] = useState(false);

  const updateReset = (state: number, action: number) => {
    if (action === 1) {
      if (state + 1 === getPageCars(garageProps.page, LIMIT_GARAGE, garage).length) {
        setIsRace(false);
      }
      return state + 1;
    }
    if (action === 0) return initReset(0);
    return state;
  };

  const [winner, dispatchWinner] = useReducer(updateWinner, initialWinner, initWinner);

  const [finishedCars, dispatchFinishedCars] = useReducer(updateReset, initialCount, initReset);

  const [needReset, setNeedReset] = useState(false);

  useEffect(() => {
    setIsRace(false);
    dispatchFinishedCars(initialCount);
    dispatchWinner(initialWinner);
  }, [garageProps.page]);

  return (
    <>
      <Wrapper>
        <CreateCar
          newCar={garageProps.newCar}
          setNewCar={garageProps.setNewCar}
          changeGarage={changeGarage}
          isRace={isRace}
        />
        <UpdateCar
          updateCar={garageProps.updateCar}
          setUpdateCar={garageProps.setUpdateCar}
          changeGarage={changeGarage}
        />
        <Container>
          <Button
            disabled={isRace}
            onClick={() => setIsRace(true)}
          >
            Race
          </Button>
          <Button
            disabled={finishedCars !== getPageCars(garageProps.page, LIMIT_GARAGE, garage).length}
            onClick={() => {
              dispatchFinishedCars(0);
              setNeedReset(true);
              dispatchWinner(initialWinner);
            }}
          >
            Reset
          </Button>
          <GenerateCars
            isDisabled={isRace}
            changeGarage={changeGarage}
          />
        </Container>
      </Wrapper>
      <Wrapper>
        {garage.length ? (
          <>
            <List>
              <h2>
                Garage(
                {garage.length}
                )
              </h2>
              <h3>
                Page #
                {garageProps.page}
              </h3>
              {getPageCars(garageProps.page, LIMIT_GARAGE, garage).map((car) => (
                <Car
                  key={car.id}
                  car={car}
                  updateCar={garageProps.setUpdateCar}
                  changeGarage={changeGarage}
                  isRace={isRace}
                  setWinner={dispatchWinner}
                  needReset={needReset}
                  setNeedReset={setNeedReset}
                  increaseFinishedCars={dispatchFinishedCars}
                />
              ))}
            </List>
            <Pagination
              page={garageProps.page}
              length={garage.length}
              limit={LIMIT_GARAGE}
              setPage={garageProps.setPage}
              isRace={isRace}
            />
            <Winner newWinner={winner.time}>
              {winner.name}
              {' '}
              win the race for
              {' '}
              {winner.time}
              s!
            </Winner>
          </>
        ) : (
          <h2>
            Here are no cars now. Try to create new car.
          </h2>
        )}
      </Wrapper>
    </>
  );
};
