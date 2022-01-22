import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as IconCar } from '../../assets/car.svg';
import { ReactComponent as IconFinish } from '../../assets/finish.svg';
import { getCar, getWinner, ENGINE } from '../../config';
import { ICarProps } from '../../types';

const ListItem = styled.li`
  margin: 1rem 0;
`;

const Manager = styled.div`
  margin: .5rem 0;
`;

const Track = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  border-bottom: 4px dashed #8f8f8f;
`;

const ManagerButton = styled.button``;

const CarTitle = styled.h4`
  margin: 0 .5em;
  display: inline-block;
  color: gold;
`;

const Controls = styled.div`
  display: flex;
  padding: 0.5rem;
`;

const ControlButton = styled.button``;

const CarTransition = keyframes`
0% {
  transform: translateX(0);
}
100% {
  transform: translateX(calc(99% - 64px));
}
`;

const Model = styled.div <{ duration: number, isDrive: string }>`
  margin-bottom: -5px;
  width: 100%;
  height: 32px;
  ${(props) => ((props.duration)
    ? css`animation: ${CarTransition} ${props.duration}ms linear forwards running;`
    : '')
}
  animation-play-state: ${(props) => props.isDrive};
`;

const StyledIconCar = styled(IconCar) <{ fill: string }>`
  width: 64px;
  height: 32px;
  g {
    fill: ${(props) => props.fill};
    stroke-width: 100;
    stroke: #fefefe;
  }
`;

const Finish = styled.div`
  position: absolute;
  right: calc(64px + 1%);
  width: 36px;
  height: 36px;
`;

const StyledIconFinish = styled(IconFinish)`
  width: 36px;
  height: 36px;
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

  const startTrack = async () => {
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
        increaseFinishedCars(1);
      });
  };

  useEffect(() => { if (isRace) startTrack(); }, [isRace]);

  const resetTrack = async () => {
    setDuration(0);
    setIsDrive('running');
    setIsDisabledStart(false);
    setIsDisabledReset(true);
  };

  useEffect(() => {
    if (needReset) {
      resetTrack();
      setNeedReset(false);
    }
  }, [needReset]);

  return (
    <ListItem>
      <Manager>
        <ManagerButton onClick={() => {
          updateCar({ id, name, color });
        }}
        >
          Select
        </ManagerButton>
        <ManagerButton
          disabled={isDisablebRemove || isRace}
          onClick={async () => {
            setIsDisabledRemove(true);
            await axios.delete(getCar(id));
            axios.delete(getWinner(id)).catch(() => 0);
            changeGarage();
          }}
        >
          Remove
        </ManagerButton>
        <CarTitle>{name}</CarTitle>
      </Manager>
      <Track>
        <Controls>
          <ControlButton
            disabled={isDisablebStart}
            onClick={async () => startTrack()}
          >
            A
          </ControlButton>
          <ControlButton
            disabled={isDisablebReset}
            onClick={async () => resetTrack()}
          >
            B
          </ControlButton>
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
