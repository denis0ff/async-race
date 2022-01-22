import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as IconCar } from '../../assets/car.svg';
import { getCar } from '../../config';
import { IWinnerCarProps } from '../../types';

const StyledIconCar = styled(IconCar) <{ fill: string }>`
  width: 32px;
  height: 16px;
  g {
    fill: ${(props) => props.fill};
    stroke-width: 100;
    stroke: #fefefe;
  }
`;

export const Car = ({
  id, wins, time, number,
}: IWinnerCarProps) => {
  const [color, setColor] = useState('');
  const [name, setName] = useState('');
  axios.get(getCar(id))
    .then(({ data }) => {
      setColor(data.color);
      setName(data.name);
    });
  return (
    <tr>
      <th>{number}</th>
      <th>
        <StyledIconCar fill={color} />
      </th>
      <th>{name}</th>
      <th>{wins}</th>
      <th>{time}</th>
    </tr>
  );
};
