import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as IconCar } from '../../assets/car.svg';
import { ReactComponent as IconFinish } from '../../assets/finish.svg';
import { getCar, getWinner, ENGINE } from '../../utils/config';
import { ICarProps } from '../../utils/types';
import { Button, Container } from './CreateCar';

const ListItem = styled.li`
  margin: 1rem 0;
`;

const Track = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  border-bottom: 4px dashed #cd853f;
`;

const CarTitle = styled.h4`
  margin: 0 .5em;
  display: inline-block;
  color: gold;
`;

const Controls = styled.div`
  display: flex;
  gap: 0.5rem 0.1rem;
  padding: 0.5rem;
`;

const CarTransition = keyframes`
0% {
  transform: translateX(0);
}
100% {
  transform: translateX(calc(99% - 6em));
}
`;

const Model = styled.div <{ duration: number, isDrive: string }>`
  margin-bottom: -5px;
  width: 100%;
  height: 3em;
  ${(props) => ((props.duration)
    ? css`animation: ${CarTransition} ${props.duration}ms linear forwards running;`
    : '')
}
  animation-play-state: ${(props) => props.isDrive};
`;

const StyledIconCar = styled(IconCar) <{ fill: string }>`
  width: 6em;
  height: 3em;
  g {
    fill: ${(props) => props.fill};
    stroke-width: 100;
    stroke: #fefefe;
  }
`;

const Finish = styled.div`
  position: absolute;
  right: calc(6em + 1%);
  width: 3em;
  height: 3em;
`;

const StyledIconFinish = styled(IconFinish)`
  width: 3em;
  height: 3em;
  fill: #910303;
`;

export const Car = ({
  car, isRace, needReset, setNeedReset, increaseFinishedCars,
  setWinner, updateCar, changeGarage,
}: ICarProps) => {
  const { id, name, color } = car;
  const [duration, setDuration] = useState(0);
  const [isDrive, setIsDrive] = useState('running');

  const [isDisablebRemove, setIsDisabledRemove] = useState(false);
  const [isDisablebStart, setIsDisabledStart] = useState(false);
  const [isDisablebReset, setIsDisabledReset] = useState(true);

  const updateWinner = (time: number) => {
    if (isRace) {
      setWinner({ id, name, time: Math.floor(time / 10) / 100 });
    }
  };

  const resetTrack = async () => {
    setDuration(0);
    setIsDrive('running');
    setIsDisabledStart(false);
    setIsDisabledReset(true);
  };

  const startTrack = async () => {
    await resetTrack();
    setIsDisabledStart(true);
    const startEngine = await axios.patch(ENGINE, null, { params: { id, status: 'started' } });
    const time = startEngine.data.distance / startEngine.data.velocity;
    setDuration(time);
    axios.patch(ENGINE, null, { params: { id, status: 'drive' } })
      .then(() => {
        updateWinner(time);
      })
      .catch(({ response }) => {
        if (response) setIsDrive('paused');
      })
      .finally(() => {
        setIsDisabledReset(false);
        if (isRace) increaseFinishedCars(1);
      });
  };

  useEffect(() => { if (isRace) startTrack(); }, [isRace]);

  useEffect(() => {
    if (needReset) {
      resetTrack();
      setNeedReset(false);
    }
  }, [needReset]);

  return (
    <ListItem>
      <Container>
        <Button onClick={() => {
          updateCar({ id, name, color });
        }}
        >
          Select
        </Button>
        <Button
          disabled={isDisablebRemove || isRace}
          onClick={async () => {
            setIsDisabledRemove(true);
            await axios.delete(getCar(id));
            axios.delete(getWinner(id)).catch(() => 0);
            changeGarage();
          }}
        >
          Remove
        </Button>
        <CarTitle>{name}</CarTitle>
      </Container>
      <Track>
        <Controls>
          <Button
            disabled={isDisablebStart}
            onClick={async () => startTrack()}
          >
            A
          </Button>
          <Button
            disabled={isDisablebReset}
            onClick={async () => resetTrack()}
          >
            B
          </Button>
        </Controls>
        <Model duration={duration} isDrive={isDrive}>
          <StyledIconCar fill={color} />
        </Model>
        <Finish>
          <StyledIconFinish />
        </Finish>
      </Track>
    </ListItem>
  );
};
