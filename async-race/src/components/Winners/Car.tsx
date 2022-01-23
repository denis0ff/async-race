import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as IconCar } from '../../assets/car.svg';
import { getCar } from '../../utils/config';
import { IWinnerCarProps } from '../../utils/types';

const StyledIconCar = styled(IconCar) <{ fill: string }>`
  width: 4em;
  height: 2em;
  g {
    fill: ${(props) => props.fill};
    stroke-width: 100;
    stroke: #fefefe;
  }
`;

const NameCeil = styled.th`
  word-break: break-word;
  width: 30em;
`;

const WinsCeil = styled.th <{ sort: string }>`
  box-shadow: ${({ sort }) => (sort === 'wins' ? '0 0 2em 2em #b3065c60 inset' : 'inherit')};
`;

const TimeCeil = styled.th <{ sort: string }>`
  box-shadow: ${({ sort }) => (sort === 'time' ? '0 0 2em 2em #b3065c60 inset' : 'inherit')};
`;

export const Car = ({
  id, wins, time, number, sort,
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
      <NameCeil>{name}</NameCeil>
      <WinsCeil sort={sort}>{wins}</WinsCeil>
      <TimeCeil sort={sort}>{time}</TimeCeil>
    </tr>
  );
};
