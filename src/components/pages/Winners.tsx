import styled from 'styled-components';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import axios from 'axios';
import { IWinner, IWinnersConfig, IWinnersProps } from '../../utils/types';
import { Pagination } from '../global/Pagination';
import {
  getPageCars, getWinners, LIMIT_WINNERS, orderPick,
} from '../../utils/config';

import { Car } from '../Winners/Car';
import { TextLink } from './NotFound';

export const Wrapper = styled.section`
  position: relative;
  padding: .5rem 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: .5rem;
`;

const Table = styled.table`
  position: relative;
  margin: 1rem 0;
  border-collapse: collapse;
  cursor: default;
`;

const THead = styled.thead`
  box-shadow: 0 0 2em 2em #380031 inset;
  th {
    padding: .5rem;
  }
`;

const WinsCeil = styled.th <{ config: IWinnersConfig }>`
  cursor: pointer;
  box-shadow: ${({ config }) => (config.sort === 'wins' ? '0 0 2em 2em #b3065c inset' : 'inherit')};
  &::before {
    content: ${({ config }) => (config.order === 'ASC' ? '"Сортировка: по возврастанию"' : '"Сортировка: по убыванию"')};
    position: absolute;
    top: -1.5em;
    left: 0;
    width: 99%;
    pointer-events: none;
    text-align: right;
  }
`;

const TimeCeil = styled.th <{ config: IWinnersConfig }>`
  min-width: 5rem;
  cursor: pointer;
  box-shadow: ${({ config }) => (config.sort === 'time' ? '0 0 2em 2em #b3065c inset' : 'inherit')};
`;

const TBody = styled.tbody`
  font-size: 0.9em;
  th {
    height: 3.5em;
  }
`;

export const Winners = ({
  config, setConfig, page, setPage,
}: IWinnersProps) => {
  const { sort, order } = config;
  const [winners, setWinners] = useState<IWinner[]>([]);

  const changeWinners = useCallback(() => {
    axios.get<IWinner[]>(getWinners(sort, order))
      .then(({ data }) => setWinners(data));
  }, [sort, order]);

  useEffect(() => {
    changeWinners();
  }, [sort, order]);

  return (
    <Wrapper>
      {winners.length
        ? (
          <>
            <h2>
              Winners(
              {winners.length}
              )
            </h2>
            <h3>
              Page #
              {page}
            </h3>
            <Table>
              <THead>
                <tr>
                  <th>#</th>
                  <th>Car</th>
                  <th>Name</th>
                  <WinsCeil
                    config={config}
                    onClick={() => (sort === 'wins'
                      ? setConfig((prevState) => ({ ...prevState, order: orderPick[order] }))
                      : setConfig((prevState) => ({ ...prevState, sort: 'wins' })))}
                  >
                    Wins (times)
                  </WinsCeil>
                  <TimeCeil
                    config={config}
                    onClick={() => (sort === 'time'
                      ? setConfig((prevState) => ({ ...prevState, order: orderPick[order] }))
                      : setConfig((prevState) => ({ ...prevState, sort: 'time' })))}
                  >
                    Best time (seconds)
                  </TimeCeil>
                </tr>
              </THead>
              <TBody>
                {getPageCars(page, LIMIT_WINNERS, winners).map((winner, index) => (
                  <Car
                    key={winner.id}
                    id={winner.id}
                    wins={winner.wins}
                    time={winner.time}
                    number={index + 1 + (page - 1) * LIMIT_WINNERS}
                    sort={config.sort}
                  />
                ))}
              </TBody>
            </Table>
            <Pagination
              page={page}
              length={winners.length}
              limit={LIMIT_WINNERS}
              setPage={setPage}
            />
          </>
        )
        : (
          <h2>
            There are no winners here right now. Try to complete the race in
            {' '}
            <TextLink to="/">Garage</TextLink>
          </h2>
        )}
    </Wrapper>
  );
};
