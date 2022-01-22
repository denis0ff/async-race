import styled from 'styled-components';
import React, {
  useCallback, useEffect, useState,
} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IWinner, IWinnersProps } from '../../types';
import { Pagination } from '../global/Pagination';
import {
  getPageCars, getWinners, LIMIT_WINNERS, orderPick,
} from '../../config';

import { Car } from '../Winners/Car';

const Wrapper = styled.section``;

const Table = styled.table`

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
              <thead>
                <tr>
                  <th>#</th>
                  <th>Car</th>
                  <th>Name</th>
                  <th onClick={() => (sort === 'wins'
                    ? setConfig((prevState) => ({ ...prevState, order: orderPick[order] }))
                    : setConfig((prevState) => ({ ...prevState, sort: 'wins' })))}
                  >
                    Wins
                  </th>
                  <th onClick={() => (sort === 'time'
                    ? setConfig((prevState) => ({ ...prevState, order: orderPick[order] }))
                    : setConfig((prevState) => ({ ...prevState, sort: 'time' })))}
                  >
                    Best time (sec)
                  </th>
                </tr>
              </thead>
              <tbody>
                {getPageCars(page, LIMIT_WINNERS, winners).map((winner, index) => (
                  <Car
                    key={winner.id}
                    id={winner.id}
                    wins={winner.wins}
                    time={winner.time}
                    number={index + 1 + (page - 1) * LIMIT_WINNERS}
                  />
                ))}
              </tbody>
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
            Here are no winners now. Try to make a race in
            {' '}
            <Link to="/">Garage</Link>
          </h2>
        )}
    </Wrapper>
  );
};
