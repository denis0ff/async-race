import axios from 'axios';
import React, { Dispatch, SetStateAction, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ReactComponent as IconCar } from '../../assets/car.svg';
import { ReactComponent as IconFinish } from '../../assets/finish.svg';
import { chooseCar, ENGINE } from '../../config';
import { ICar, ReturnPromiseVoid } from '../../types';

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
  border-bottom: 4px dashed #8f8f8f
`;

const ManagerButton = styled.button``;

const CarTitle = styled.h4`
  margin: 0 .5em;
  display: inline-block;
  color: gold;
`;

const Controls = styled.div``;

const ControlButton = styled.button``;

const CarTransition = keyframes`
0% {
  transform: translateX(0);
}
100% {
  transform: translateX(600px);
}
`;

const Model = styled.div <{ duration: number, isDrive: string }>`
  margin-bottom: -5px;
  width: 64px;
  height: 32px;
  ${(props) => ((props.duration)
    ? css`animation: ${CarTransition} ${props.duration}ms linear forwards running;`
    : '')
}
  animation-play-state: ${(props) => props.isDrive};
  // animation: ${CarTransition} ${(props) => props.duration}ms linear forwards ${(props) => (props.duration ? 'running' : 'paused')};
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
  changeGarage, id, name, color, updateCar,
}: {
  changeGarage: ReturnPromiseVoid,
  id: ICar['id'], name: ICar['name'],
  color: ICar['color'],
  updateCar: Dispatch<SetStateAction<number | null>>
}) => {
  const [duration, setDuration] = useState(0);
  const [isDrive, setIsDrive] = useState('running');

  const [isDisablebRemove, setIsDisabledRemove] = useState(false);
  const [isDisablebStart, setIsDisabledStart] = useState(false);
  const [isDisablebReset, setIsDisabledReset] = useState(true);

  return (
    <ListItem>
      <Manager>
        <ManagerButton onClick={() => updateCar(id)}>
          Select
        </ManagerButton>
        <ManagerButton
          disabled={isDisablebRemove}
          onClick={async () => {
            setIsDisabledRemove(true);
            await axios.delete(chooseCar(id));
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
            onClick={async () => {
              setIsDisabledStart(true);
              const startEngine = await axios.patch(ENGINE, null, { params: { id, status: 'started' } });
              setDuration(startEngine.data.distance / startEngine.data.velocity);
              setIsDisabledReset(false);
              axios.patch(ENGINE, null, { params: { id, status: 'drive' } }).catch((error) => {
                if (error.response) setIsDrive('paused');
              });
            }}
          >
            A
          </ControlButton>
          <ControlButton
            disabled={isDisablebReset}
            onClick={async () => {
              setDuration(0);
              setIsDrive('running');
              setIsDisabledStart(false);
              setIsDisabledReset(true);
              await axios.patch(ENGINE, null, { params: { id, status: 'stopped' } });
            }}
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
