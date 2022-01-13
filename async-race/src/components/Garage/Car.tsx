import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconCar } from '../../assets/car.svg';
import { ReactComponent as IconFinish } from '../../assets/finish.svg';
import { deleteCar } from '../../config';
import ICar from '../../types';

const ListItem = styled.li``;

const Manager = styled.div``;

const Track = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  border-bottom: 4px dashed #8f8f8f
`;

const ManagerButton = styled.button``;

const CarTitle = styled.h4`
  display: inline-block;
`;

const Controls = styled.div``;

const ControlButton = styled.button``;

const Model = styled.div`
  width: 64px;
  height: 32px;
`;

const StyledIconCar = styled(IconCar) <{ fill: string }>`
  width: 64px;
  height: 32px;
  g {
    fill: ${(props) => props.fill};
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

export const Car = ({ id, name, color }: { id: ICar['id'], name: ICar['name'], color: ICar['color'] }) => {
  console.log(color);

  return (
    <ListItem>
      <Manager>
        <ManagerButton>Select</ManagerButton>
        <ManagerButton onClick={() => axios.delete(deleteCar(id))}>Remove</ManagerButton>
        <CarTitle>{name}</CarTitle>
      </Manager>
      <Track>
        <Controls>
          <ControlButton>A</ControlButton>
          <ControlButton>B</ControlButton>
        </Controls>
        <Model>
          <StyledIconCar fill={color} />
        </Model>
        <Finish>
          <StyledIconFinish />
        </Finish>
      </Track>
    </ListItem>
  );
};
