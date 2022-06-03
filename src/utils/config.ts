import { IOrderPick } from './types';

const BASE = 'https://denis0ff-async-race.herokuapp.com/';

export const GARAGE = `${BASE}garage`;

export const getCar = (id: number) => `${GARAGE}/${id}`;

export const ENGINE = `${BASE}engine/`;

export const WINNERS = `${BASE}winners`;

export const getWinner = (id: number) => `${WINNERS}/${id}`;

export const getWinners = (sort: string, order: string) => `${WINNERS}?_sort=${sort}&_order=${order}`;

export const getPageCars = <T>(page: number, limit: number, array: T[]): T[] => {
  const start = (page - 1) * limit;
  const pageLimit = page * limit;
  const end = array.length > pageLimit ? pageLimit : array.length;
  return array.slice(start, end);
};

export const orderPick: IOrderPick = { ASC: 'DESC', DESC: 'ASC' };

export const LIMIT_WINNERS = 10;

export const LIMIT_GARAGE = 7;
